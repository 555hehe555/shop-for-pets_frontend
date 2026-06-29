import { useState } from "react";
import styles from "./Header.module.scss";

import Button from "@/ui/Button/Button.tsx";
import Modal from "@/ui/Modal/Modal.tsx";
import Input from "@/ui/Input/Input.tsx";
import { RegistrationForm } from "@/features/auth";
import { UserCart } from "@/features/cart";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <header>
      <div>
        <span className={styles.logo}>SfP</span>
      </div>

      <div className={styles.left}>
        <div className={styles.containerLinks}>
          <li className={styles.link}>
            <Button size="sm" variant="primary">
              Login
            </Button>
          </li>
          <li>
            <Button size="sm" variant="primary" onClick={openModal}>
              Registration
            </Button>
            {isModalOpen && (
              <Modal onClose={closeModal}>
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
