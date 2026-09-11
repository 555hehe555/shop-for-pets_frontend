import { useNavigate } from "react-router-dom";
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
    <Box sx={styles.container}>
      <Box
        component="img"
        sx={styles.image}
        src={getRandomImage(situation)}
        alt={`Image for ${situation} situation`}
      />
      <Typography variant="h4" component="h2" sx={styles.title}>
        {title}
      </Typography>
      <Typography variant="body1" sx={styles.message}>
        {message}
      </Typography>

      <Box sx={styles.buttons}>
        <Button
          style={{ width: "200px" }}
          size="sm"
          onClick={() => navigate("/")}
        >
          На головну
        </Button>
        <Button
          style={{ width: "200px" }}
          size="sm"
          onClick={() => window.history.back()}
        >
          До попередньої сторінки
        </Button>
      </Box>
    </Box>
  );
}
