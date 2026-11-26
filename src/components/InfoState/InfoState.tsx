import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

import Button from "@/ui/Button/Button";
import { styles } from "./InfoState.styles";

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
  titleComponent?: "h1" | "h2";
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
  titleComponent = "h2",
}: InfoStateProps) {
  const navigate = useNavigate();
  const [imageSrc] = useState(() => getRandomImage(situation));

  return (
    <Box sx={styles.container}>
      <Box
        component="img"
        sx={styles.image}
        src={imageSrc}
        alt={`Image for ${situation} situation`}
      />
      <Typography variant="h4" component={titleComponent} sx={styles.title}>
        {title}
      </Typography>
      <Typography variant="body1" sx={styles.message}>
        {message}
      </Typography>

      <Box sx={styles.buttons}>
        <Button size="sm" onClick={() => navigate("/")}>
          На головну
        </Button>
        <Button size="sm" onClick={() => window.history.back()}>
          До попередньої сторінки
        </Button>
      </Box>
    </Box>
  );
}
