import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    p: 1,
    textAlign: "center",

    "& .question": { fontWeight: 700, mb: 1 },
    "& .description": { mb: 3 },
    "& .buttonStack": { flexDirection: "row", justifyContent: "space-between" },
    "& .button": { px: "30px" },
  },
};
