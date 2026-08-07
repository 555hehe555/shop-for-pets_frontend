import styles from "./CartBtn.module.scss";

import { GrCart } from "react-icons/gr";

interface CartBtnProps {
  count: number;
}

export function CartBtn({ count }: CartBtnProps) {
  return (
    <div className={styles.cartContainer}>
      <GrCart className={styles.cartImg} />
      {count > 0 && (
        <div className={styles.cartCountContainer}>
          <span className={styles.cartCount}>{count}</span>
        </div>
      )}
    </div>
  );
}
