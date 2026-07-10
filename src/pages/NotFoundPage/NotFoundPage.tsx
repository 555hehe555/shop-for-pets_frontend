import { useNavigate } from "react-router-dom";

import Button from "@/ui/Button/Button";
import styles from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src="https://testbanderovec2015.wordpress.com/wp-content/uploads/2017/07/d0bad0bed182d181d0ba11.jpg?w=449&h=632"
        alt="кіт провідник"
      />
      <h2 className={styles.title}>Опа... щось пішло не так</h2>
      <p className={styles.message}>
        я тут глянув, але не знайшов цю сторінку, можеш перейти на
        <span className={styles.bold}> головну</span> або ж на
        <span className={styles.bold}> минулу сторінку</span>, та там спробувати
        знову?
      </p>

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          size="lg"
          onClick={() => navigate("/")}
        >
          На головну
        </Button>
        <Button
          className={styles.button}
          size="lg"
          onClick={() => window.history.back()}
        >
          До попередньої сторінки
        </Button>
      </div>
    </div>
  );
}
