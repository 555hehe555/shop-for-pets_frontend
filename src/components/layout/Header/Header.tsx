import { useState } from "react";
import styles from "./Header.module.scss";

import Button from "@/ui/Button/Button.tsx";
import Modal from "@/ui/Modal/Modal.tsx";
import Input from "@/ui/Input/Input.tsx";
import { RegistrationForm, LoginForm } from "@/features/auth";

import { useCart, UserCart } from "@/features/cart";
import { Link } from "react-router-dom";

export default function Header() {
  const { itemsCount } = useCart();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openRegistrationModal = () => setIsRegistrationOpen(true);
  const closeRegistrationModal = () => setIsRegistrationOpen(false);

  return (
    <header>
      <Link to="/" className={styles.logo}>
        SfP
      </Link>

      <div className={styles.left}>
        <div className={styles.containerLinks}>
          <li>
            <Button size="sm" variant="tertiary" onClick={openLoginModal}>
              Login
            </Button>
          </li>
          <li>
            <Button size="sm" variant="primary" onClick={openRegistrationModal}>
              Registration
            </Button>
          </li>
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
          <UserCart count={itemsCount} />
        </Link>
      </div>

      <Modal isOpen={isLoginOpen} onClose={closeLoginModal}>
        <LoginForm />
      </Modal>

      <Modal isOpen={isRegistrationOpen} onClose={closeRegistrationModal}>
        <RegistrationForm
          onSubmit={(value) => {
            console.log(value);
          }}
        />
      </Modal>
    </header>
  );
}
