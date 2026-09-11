import type { SxProps, Theme } from "@mui/material";

const fadeMask = {
  maskImage: `linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent), linear-gradient(to bottom, transparent, black 20px, black calc(100% - 20px), transparent)`,
  maskComposite: "intersect",
  WebkitMaskImage: `linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent), linear-gradient(to bottom, transparent, black 20px, black calc(100% - 20px), transparent)`,
  WebkitMaskComposite: "source-in",
};

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    minHeight: "calc(100vh - 80px)",
    padding: "40px 20px",
  } as SxProps<Theme>,
  image: {
    width: 300,
    ...fadeMask,
  } as SxProps<Theme>,
  title: {
    marginTop: "20px",
    fontSize: "32px",
    fontWeight: "bold",
  } as SxProps<Theme>,
  message: {
    fontSize: "20px",
    marginTop: "20px",
    maxWidth: "500px",
    width: "100%",
    "& .bold": {
      fontWeight: "bold",
    },
  } as SxProps<Theme>,
  buttons: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  } as SxProps<Theme>,
};
