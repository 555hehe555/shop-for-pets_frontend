import { useNavigate } from "react-router-dom";

import Button from "@/ui/Button/Button";
import styles from "./InfoState.module.scss";

import {
  CatLibrarian,
  CatsWithBox,
  CatLoaf,
  CatLook,
  CatError,
} from "@/data/images";

export type InfoSituation = "notFound" | "emptyCart" | "loading" | "error";

interface InfoStateProps {
  title: string;
  message: string;
  situation: InfoSituation;
}

const situationImages: Record<InfoSituation, string[]> = {
  notFound: [CatLibrarian, CatsWithBox],
  emptyCart: [CatLoaf, CatLook],
  loading: [CatLook],
  error: [CatError],
};

function getRandomImage(situation: keyof typeof situationImages) {
  const images = situationImages[situation];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

export default function InfoState({
  title,
  message,
  situation,
}: InfoStateProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={getRandomImage(situation)}
        alt={`Image for ${situation} situation`}
      />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          size="sm"
          onClick={() => navigate("/")}
        >
          На головну
        </Button>
        <Button
          className={styles.button}
          size="sm"
          onClick={() => window.history.back()}
        >
          До попередньої сторінки
        </Button>
      </div>
    </div>
  );
}
