import styles from './ProductCard.module.scss';


interface ProductCardProps {
  imgUrl: string;
  name: string;
  price: number;
  discount?: number;
};

export default function ProductCard({ imgUrl, name, price, discount }: ProductCardProps) {

  return (
    <div className={styles['card-container']}>
      <div>
        <img className={styles['card-img']} src={imgUrl} alt={name} />
      </div>
      <div className={styles['card-info']}>
        <h3>{name}</h3>
        <p></p>
        {discount
          ? (
            <div>
              <span>
                {price - discount}
              </span>
              <br />
              <span>
                {price}
              </span>
              <br />
              <span>
                {discount}
              </span>
            </div>
          )
          : <div><span>{price}</span></div>
        }


      </div>
    </div>
  )
};
