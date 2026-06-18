import styles from "./basicBtn.module.scss";

interface BasicButtonProps {
  text: string;
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}

export default function BasicBtn({
  text,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
}: BasicButtonProps) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}