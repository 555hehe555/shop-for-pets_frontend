import { Modal as MuiModal, Box } from "@mui/material";
import Button from "../Button/Button";
import { styles } from "./Modal.styles";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <MuiModal open={isOpen} onClose={onClose} sx={styles.backdrop}>
      <Box sx={styles.modal}>
        <Button
          variant="tertiary"
          size="xs"
          onClick={onClose}
          aria-label="Close modal"
          style={{ background: "white" }}
        >
          &times;
        </Button>
        {children}
      </Box>
    </MuiModal>
  );
}
