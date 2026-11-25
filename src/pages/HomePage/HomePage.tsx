import Main from "@/components/layout/Main/Main.tsx";
import { ProductsList } from "@/features/catalog/components/ProductsList/ProductsList";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Typography } from "@mui/material";
import { styles } from "./HomePage.styles";

export default function HomePage() {
  useDocumentTitle("Каталог товарів");

  return (
    <Main>
      <Typography component="h1" variant="h4" sx={styles.title}>
        Каталог товарів
      </Typography>
      <ProductsList />
    </Main>
  );
}
