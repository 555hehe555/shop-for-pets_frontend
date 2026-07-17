import { useEffect, useState } from "react";
import { BASE_URL } from "@/data/user-config.json";
import styles from "./ProductDetails.module.scss";
import Button from "@/ui/Button/Button";
import { useCart } from "@/features/cart/context/CartContext";
import type { Product } from "../../api";

interface ProductDetailsInterfase {
  id: string;
}

export function ProductDetails({ id }: ProductDetailsInterfase) {
  const [product, setProduct] = useState<Product>();
  const { addToCartItem } = useCart();

  useEffect(() => {
    async function getProductById() {
      const response = await fetch(`${BASE_URL}/product/${id}`);
      const productData = await response.json();
      setProduct(productData);
    }
    getProductById();
  }, [id]);

  return (
    <main>
      <div className={styles.cardContainer}>
        <img
          className={styles.cardImg}
          src={product?.imgUrl}
          alt={product?.name}
        />

        <div className={styles.cardInfo}>
          <h3 className={styles.name}>{product?.name}</h3>
          <div className={styles.price}>
            {product?.discount ? (
              <>
                <span className={styles.newPrice}>
                  {product.price - product?.discount}₴
                </span>

                <span className={styles.oldPrice}>{product.price}₴</span>
              </>
            ) : (
              <>
                <span className={styles.allPrice}>{product?.price}₴</span>
              </>
            )}
          </div>
          <>
            {product?.discount && (
              <>
                <hr></hr>
                <p className={styles.discount}>Save - {product?.discount}₴</p>
              </>
            )}
          </>
        </div>
      </div>

      <Button
        onClick={() => {
          addToCartItem(String(product?.id));
        }}
      >
        в корзину
      </Button>
    </main>
  );
}
