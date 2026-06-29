import styles from "./UserCart.module.scss";

import { GrCart } from "react-icons/gr";

interface UserCartProps {
  count: number;
}

export function UserCart({ count }: UserCartProps) {
  return (
    <div className={styles.cartContainer}>
      <GrCart className={styles.cartImg} />
      <p className={styles.cartP}>{count}</p>
    </div>
  );
}
