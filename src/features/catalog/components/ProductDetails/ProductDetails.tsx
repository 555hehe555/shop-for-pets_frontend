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

  if (!product) return <p>Завантаження...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <div className={styles.gallery}>
          <img
            className={styles.image}
            src={product.imgUrl}
            alt={product.name}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>

          {/* <div className={styles.stock}>
            {product.quantity > 0 ? "✔ В наявності" : "✖ Немає в наявності"}
          </div> */}

          {product.quantity > 0 ? (
            <div className={styles.stock}>✔ В наявності</div>
          ) : (
            <div className={styles.notInStock}>✖ Немає в наявності</div>
          )}

          <div className={styles.priceBlock}>
            {product.discount ? (
              <>
                <span className={styles.newPrice}>
                  {product.price - product.discount}₴
                </span>

                <span className={styles.oldPrice}>{product.price}₴</span>
              </>
            ) : (
              <span className={styles.newPrice}>{product.price}₴</span>
            )}
          </div>

          {product.discount ||
            (0 > 0 && (
              <p className={styles.discount}>
                Ви економите {product.discount}₴
              </p>
            ))}

          <div className={styles.actions}>
            <Button size="lg" onClick={() => addToCartItem(String(product.id))}>
              Додати у кошик
            </Button>
          </div>
        </div>
      </div>

      <section className={styles.description}>
        <h2>Опис товару</h2>

        <p>
          Тут поки що буде опис товару. Потім ти просто підставиш
          product.description.
        </p>
      </section>
    </div>
  );
}
