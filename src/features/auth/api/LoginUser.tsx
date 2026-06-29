import { BASE_URL } from "@/data/user-config.json";

interface LoginProps {
  username: string;
  pass: string;
}

// потім це перейде в бекенд
async function isUser_test({ username, pass }: LoginProps) {
  const response = await fetch(`${BASE_URL}/user`);
  const users = await response.json();

  return users.some(
    (user: LoginProps) => user.username === username && user.pass === pass,
  );
}

export async function putLogin({ username, pass }: LoginProps) {
  const isUser = await isUser_test({ username, pass });

  if (!isUser) {
    console.log("Користувача не знайдено");
    return;
  }

  console.log("Вхід успішний");
}
