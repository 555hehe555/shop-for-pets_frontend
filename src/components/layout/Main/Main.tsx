import { styles } from "./Main.styles";
import { Box } from "@mui/material";
import type { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <Box component="main" sx={styles.root}>
      {children}
    </Box>
  );
}
