// import { useState } from "react";
import styles from "./Header.module.scss";

import UserCart from "../../UserCart/UserCart.tsx";
import Button from "../../Button/Button.tsx";
import Input from "../../Input/Input";

export default function Header() {
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
          <li className={styles.link}>
            <Button size="sm" variant="primary">
              Registration
            </Button>
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
