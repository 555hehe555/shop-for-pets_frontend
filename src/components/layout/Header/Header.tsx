import { useState } from "react";
import styles from "./Header.module.scss";

import UserCart from "../../UserCart/UserCart.tsx";
import Button from "../../Button/Button.tsx";
import Input from "../../Input/Input";
import Modal from "../../Modal/Modal.tsx";
import RegistrationForm from "../../RegistrationForm/RegistrationForm.tsx";

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
          <Input type="text" size="md" placeholder="Search" maxLength={100} />
        </div>

        <div>
          <UserCart count={3} />
        </div>
      </div>
    </header>
  );
}
