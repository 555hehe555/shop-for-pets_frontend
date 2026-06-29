import styles from "./ProductCard.module.scss";
import type { Product } from "../ProductsList/ProductsList";

interface ProductCardProps {
  onToggleCart: (id: number) => void;
  product: Product;
}

// interface cartState {
//   addCard: boolean
//   onuUpdate: () => void
// }

export function ProductCard({ onToggleCart, product }: ProductCardProps) {
  const { id, imgUrl, name, price, discount } = product;

  const handleClick = () => {
    onToggleCart(id);
  };

  return (
    <li className={styles.cardContainer}>
      <a onClick={handleClick}>
        <img className={styles.cardImg} src={imgUrl} alt={name} />

        <div className={styles.cardInfo}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.price}>
            {discount ? (
              <>
                <span className={styles.newPrice}>{price - discount}₴</span>

                <span className={styles.oldPrice}>{price}₴</span>
              </>
            ) : (
              <>
                <span className={styles.allPrice}>{price}₴</span>
              </>
            )}
          </div>
          <>
            {discount && (
              <>
                <hr></hr>
                <p className={styles.discount}>Save - {discount}₴</p>
              </>
            )}
          </>
        </div>
      </a>
    </li>
  );
}
