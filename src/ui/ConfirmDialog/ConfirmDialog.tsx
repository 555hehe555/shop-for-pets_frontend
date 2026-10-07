import { Box, Stack, Typography } from "@mui/material";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { styles } from "./ConfirmDialog.styles";

interface ConfirmDialogInterfase {
  question: string;
  cancelText?: string;
  confirmText?: string;

  isDialogOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  question,
  cancelText,
  confirmText,

  isDialogOpen,
  onCancel,
  onConfirm,
}: ConfirmDialogInterfase) {
  return (
    <Modal isOpen={isDialogOpen} onClose={onCancel}>
      <Box sx={styles.container}>
        <Typography variant="h5" component="h2" className="question">
          Ви впевнені?
        </Typography>
        <Typography variant="body1" className="description">
          {question}
        </Typography>
        <Stack className="buttonStack">
          <Button variant="secondary" onClick={onCancel} className="button">
            {cancelText || "ні"}
          </Button>
          <Button variant="danger" onClick={onConfirm} className="button">
            {confirmText || "так"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
