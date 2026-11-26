export interface AuthFieldErrors {
  [field: string]: string[];
}

type AuthOperation = "login" | "registration";

const FIELD_LABELS: Record<string, string> = {
  username: "Ім'я користувача",
  email: "Email",
  password: "Пароль",
  pass: "Пароль",
  pass1: "Пароль",
  pass2: "Підтвердження пароля",
};

const BACKEND_MESSAGE_TRANSLATIONS: Record<string, string> = {
  "This field is required.": "Це поле обов'язкове.",
  "This field may not be blank.": "Це поле не може бути порожнім.",
  "This field may not be null.": "Це поле не може бути порожнім.",
  "Enter a valid email address.": "Введіть коректну email-адресу.",
  "A user with that username already exists.":
    "Користувач з таким іменем уже існує.",
  "A user with that email already exists.":
    "Користувач з такою email-адресою вже існує.",
  "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.":
    "Введіть коректне ім'я користувача. Дозволені лише літери, цифри та символи @/./+/-/_.",
  "This password is too short. It must contain at least 8 characters.":
    "Пароль занадто короткий. Він має містити щонайменше 8 символів.",
  "This password is too common.": "Пароль занадто простий.",
  "This password is entirely numeric.":
    "Пароль не може складатися лише з цифр.",
  "The password is too similar to the username.":
    "Пароль занадто схожий на ім'я користувача.",
  "Invalid credentials.": "Неправильний логін або пароль.",
  "No active account found with the given credentials":
    "Неправильний логін або пароль.",
  "No active account found with the given credentials.":
    "Неправильний логін або пароль.",
};

export class AuthApiError extends Error {
  readonly status: number;
  readonly fieldErrors: AuthFieldErrors;
  readonly detail?: string;

  constructor(status: number, fieldErrors: AuthFieldErrors, detail?: string) {
    super(detail ?? `Auth request failed with status ${status}`);
    this.name = "AuthApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
    this.detail = detail;
  }
}

function translateMessage(message: string): string {
  return BACKEND_MESSAGE_TRANSLATIONS[message.trim()] ?? message;
}

function toMessages(value: unknown): string[] {
  if (typeof value === "string") {
    return [translateMessage(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap(toMessages);
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(toMessages);
  }

  return [];
}

function parseErrorPayload(payload: unknown): {
  fieldErrors: AuthFieldErrors;
  detail?: string;
} {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    const messages = toMessages(payload);

    return {
      fieldErrors: {},
      detail: messages.length ? messages.join(" ") : undefined,
    };
  }

  const fieldErrors: AuthFieldErrors = {};
  const details: string[] = [];

  Object.entries(payload).forEach(([field, value]) => {
    const messages = toMessages(value);

    if (!messages.length) {
      return;
    }

    if (field === "detail" || field === "non_field_errors") {
      details.push(...messages);
      return;
    }

    fieldErrors[field] = messages;
  });

  return {
    fieldErrors,
    detail: details.length ? details.join(" ") : undefined,
  };
}

export async function createAuthApiError(
  response: Response,
): Promise<AuthApiError> {
  try {
    const payload = await response.json();
    const { fieldErrors, detail } = parseErrorPayload(payload);
    return new AuthApiError(response.status, fieldErrors, detail);
  } catch {
    return new AuthApiError(response.status, {}, "Failed to parse response");
  }
}

function formatFieldErrors(fieldErrors: AuthFieldErrors): string {
  return Object.entries(fieldErrors)
    .map(([field, messages]) => {
      const label = FIELD_LABELS[field] ?? `Поле «${field}»`;

      return `${label}: ${messages.join(" ")}`;
    })
    .join("; ");
}

export function getAuthErrorMessage(
  error: unknown,
  operation: AuthOperation,
): string {
  const genericMessage =
    operation === "login"
      ? "Не вдалося увійти. Спробуйте ще раз."
      : "Не вдалося зареєструватися. Спробуйте ще раз.";

  if (error instanceof AuthApiError) {
    if (error.status === 401) {
      return operation === "login"
        ? "Неправильний логін або пароль. Перевірте введені дані."
        : "Реєстрація виконана, але автоматичний вхід не вдався. Спробуйте увійти вручну.";
    }

    if (error.status === 400) {
      const fieldErrors = formatFieldErrors(error.fieldErrors);

      if (fieldErrors) {
        return `Перевірте введені дані. ${fieldErrors}`;
      }

      if (error.detail) {
        return `Перевірте введені дані. ${error.detail}`;
      }

      return `Перевірте введені дані та спробуйте ще раз.`;
    }

    return genericMessage;
  }

  if (error instanceof TypeError) {
    return "Не вдалося з'єднатися із сервером. Перевірте мережеве з'єднання та спробуйте ще раз.";
  }

  return genericMessage;
}
