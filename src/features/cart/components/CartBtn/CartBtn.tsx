import { Box, Typography } from "@mui/material";
import { styles } from "./CartBtn.styles";

import { ShoppingCart } from "@phosphor-icons/react";

interface CartBtnProps {
  count: number;
}

export function CartBtn({ count }: CartBtnProps) {
  return (
    <Box sx={styles.cartContainer}>
      <ShoppingCart size={36} color="white" />
      {count > 0 && (
        <Box sx={styles.cartCountContainer}>
          <Typography sx={styles.cartCount}>{count}</Typography>
        </Box>
      )}
    </Box>
  );
}
