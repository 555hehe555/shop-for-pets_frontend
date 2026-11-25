import Main from "@/components/layout/Main/Main";
import { CartOverview } from "@/features/cart/components/CartOverview/CartOverview";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Typography } from "@mui/material";
import { styles } from "./CartPage.styles";

export default function CartPage() {
  useDocumentTitle("Кошик");

  return (
    <Main>
      <Typography component="h1" variant="h4" sx={styles.title}>
        Кошик
      </Typography>
      <CartOverview />
    </Main>
  );
}
