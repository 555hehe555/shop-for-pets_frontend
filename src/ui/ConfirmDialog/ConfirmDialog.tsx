import { Box, Stack, Typography } from "@mui/material";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

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
      <Box sx={{ p: 1, textAlign: "center" }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          Ви впевнені?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {question}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="secondary" onClick={onCancel}>
            {cancelText || "ні"}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmText || "так"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
