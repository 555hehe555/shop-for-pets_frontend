import { Box, Typography } from "@mui/material";
import { styles } from "./Footer.styles";

export default function Footer() {
  return (
    <Box component="footer" sx={styles.footer}>
      <Typography variant="body2" sx={styles.copyright}>
        &copy; 3301. All rights don't reserved.
      </Typography>
    </Box>
  );
}
