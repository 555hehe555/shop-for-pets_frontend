import styles from "./UserCart.module.scss";
import shoppingCart from "../../data/shopping_cart.svg";

interface CartProps {
  count: number;
}

export default function Cart({ count }: CartProps) {
  return (
    <div className={styles.cartContainer}>
      <img className={styles.cartImg} src={shoppingCart} alt="Shopping Cart" />
      <p className={styles.cartP}>{count}</p>
    </div>
  );
}
