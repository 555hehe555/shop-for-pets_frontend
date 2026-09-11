import { Box, Typography } from "@mui/material";
import { styles } from "./CartBtn.styles";

import { GrCart } from "react-icons/gr";

interface CartBtnProps {
  count: number;
}

export function CartBtn({ count }: CartBtnProps) {
  return (
    <Box sx={styles.cartContainer}>
      <Box component={GrCart} sx={styles.cartImg} />
      {count > 0 && (
        <Box sx={styles.cartCountContainer}>
          <Typography sx={styles.cartCount}>{count}</Typography>
        </Box>
      )}
    </Box>
  );
}
