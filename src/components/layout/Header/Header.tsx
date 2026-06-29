import { useState } from "react";
import styles from "./Header.module.scss";

import Button from "@/ui/Button/Button.tsx";
import Modal from "@/ui/Modal/Modal.tsx";
import Input from "@/ui/Input/Input.tsx";
import { RegistrationForm, LoginForm, putLogin } from "@/features/auth";

import { UserCart } from "@/features/cart";

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openRegistrationModal = () => setIsRegistrationOpen(true);
  const closeRegistrationModal = () => setIsRegistrationOpen(false);

  return (
    <header>
      <div>
        <span className={styles.logo}>SfP</span>
      </div>

      <div className={styles.left}>
        <div className={styles.containerLinks}>
          <li>
            <Button size="sm" variant="secondary" onClick={openLoginModal}>
              Login
            </Button>
            {isLoginOpen && (
              <Modal onClose={closeLoginModal}>
                <LoginForm
                  onSubmit={(value) => {
                    putLogin(value);
                    console.log(value);
                  }}
                />
              </Modal>
            )}
          </li>
          <li>
            <Button size="sm" variant="primary" onClick={openRegistrationModal}>
              Registration
            </Button>
            {isRegistrationOpen && (
              <Modal onClose={closeRegistrationModal}>
                <RegistrationForm
                  onSubmit={(value) => {
                    console.log(value);
                  }}
                />
              </Modal>
            )}
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

        <div>
          <UserCart count={3} />
        </div>
      </div>
    </header>
  );
}
