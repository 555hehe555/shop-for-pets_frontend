import styles from "./UserCart.module.scss";

import { GrCart } from "react-icons/gr";

interface CartProps {
  count: number;
}

export default function Cart({ count }: CartProps) {
  return (
    <div className={styles.cartContainer}>
      <GrCart className={styles.cartImg} />
      <p className={styles.cartP}>{count}</p>
    </div>
  );
}
