import type { SxProps, Theme } from "@mui/material";

export const styles = {
  backdrop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as SxProps<Theme>,
  modal: {
    position: "relative",
    maxWidth: 700,
    maxHeight: 700,
    borderRadius: "18px",
    backgroundColor: "background.paper",
    padding: "20px",
    outline: "none",
  } as SxProps<Theme>,
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    minWidth: "unset",
    backgroundColor: "#fff",
    color: "#333",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "&:focus": {
      outline: "2px solid #007bff",
    },
  } as SxProps<Theme>,
};
