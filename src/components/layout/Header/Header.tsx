import { useState } from "react";
import styles from "./Header.module.scss";

import Button from "@/ui/Button/Button.tsx";
import Modal from "@/ui/Modal/Modal.tsx";
import Input from "@/ui/Input/Input.tsx";
import { RegistrationForm, LoginForm } from "@/features/auth";

import { useCart, CartBtn } from "@/features/cart";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import ConfirmDialog from "@/ui/ConfirmDialog/ConfirmDialog";

export default function Header() {
  const { itemsCount } = useCart();
  const { isAuthenticated, logoutUser } = useAuth();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openRegistrationModal = () => setIsRegistrationOpen(true);
  const closeRegistrationModal = () => setIsRegistrationOpen(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  function closeAndLogoutDialog() {
    closeDialog();
    logoutUser();
  }

  return (
    <header>
      <Link to="/" className={styles.logo}>
        SfP
      </Link>

      <div className={styles.left}>
        <div className={styles.containerLinks}>
          {!isAuthenticated ? (
            <>
              <li>
                <Button size="sm" variant="tertiary" onClick={openLoginModal}>
                  Login
                </Button>
              </li>
              <li>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={openRegistrationModal}
                >
                  Registration
                </Button>
              </li>
            </>
          ) : (
            <li>
              <Button size="sm" variant="tertiary" onClick={openDialog}>
                Logout
              </Button>
            </li>
          )}
        </div>

        <div className={styles.containerSeaech}>
          <Input
            type="text"
            inputSize="md"
            placeholder="Search"
            maxLength={100}
          />
        </div>

        <Link to="/cart" className={styles.btnCart}>
          <CartBtn count={itemsCount} />
        </Link>
      </div>

      <Modal isOpen={isLoginOpen} onClose={closeLoginModal}>
        <LoginForm onLoginSuccessful={closeLoginModal} />
      </Modal>

      <Modal isOpen={isRegistrationOpen} onClose={closeRegistrationModal}>
        <RegistrationForm onRegistrationSuccessful={closeRegistrationModal} />
      </Modal>

      <ConfirmDialog
        question="ви впевнені що хочете вийти?"
        isDialogOpen={isDialogOpen}
        onCancel={closeDialog}
        onConfirm={closeAndLogoutDialog}
      />
    </header>
  );
}
