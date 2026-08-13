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
      <div>
        <h2>Ви впевнені?</h2>
        <p>{question}</p>
        <div>
          <Button variant="secondary" onClick={onCancel}>
            {cancelText || "ні"}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmText || "так"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
