import styles from "./UserCart.module.scss";

import { GrCart } from "react-icons/gr";

interface UserCartProps {
  count: number;
}

export function UserCart({ count }: UserCartProps) {
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
