import styles from './ProductCard.module.scss';


interface ProductCardProps {
  imgUrl: string;
  name: string;
  price: number;
  discount?: number;
};

export default function ProductCard({ imgUrl, name, price, discount }: ProductCardProps) {

  return (
    <li className={styles.cardContainer}>
      <a href='#'>
        <img className={styles.cardImg} src={imgUrl} alt={name} />
        
        <div className={styles.cardInfo}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.price}>
            {discount ? (
                <>
                  <span className={styles.newPrice}>{price - discount}₴</span>
                  
                  <span className={styles.oldPrice}>{price}₴</span>
                </>
              )
              : <><span className={styles.allPrice}>{price}₴</span></>
            }
          </div>
          <>
            {discount &&
              <>
                <hr></hr>
                <p className={styles.discount}>Save - {discount}₴</p>
              </>
            }
          </>
        </div>
      </a>
    </li>
  )
};
