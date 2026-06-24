// import { useState } from "react";
import styles from "./Header.module.scss";

import UserCart from "../../UserCart/UserCart.tsx";
// import BasicBtn from "../../Button/Button.tsx";
import Input from "../../Input/Input";

export default function Header() {
  return (
    <header>
      <div>
        <span className={styles.logo}>SfP</span>
      </div>

      <div className={styles.left}>
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
