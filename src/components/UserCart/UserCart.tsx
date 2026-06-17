import styles from './UserCart.module.scss'

interface CartProps {
  count: number;
}

export default function Cart({ count }: CartProps) {
  return (
    <div>
      <p className={styles.inCart}>Корзина: {count}</p>
    </div>
  );
}