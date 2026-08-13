import { useEffect, useState } from "react";
import { BASE_URL } from "@/data/user-config.json";
import styles from "./ProductDetails.module.scss";
import Button from "@/ui/Button/Button";
import { useCart } from "@/features/cart/context/CartContext";
import type { Product } from "@/types/api";
import toast from "react-hot-toast";
import { useProductById } from "@/queries/catalog/useCatalogQueries";
import { mainImgResolver } from "@/utils/mainImgResolver";

export function ProductDetails({ id }: { id: number }) {
  const { addToCartItem } = useCart();

  const { data: product, isLoading } = useProductById(id);

  async function handeleAddToCart() {
    try {
      await addToCartItem(id);

      toast.success("Додано в корзину");
    } catch (error) {
      toast.error("помилка при додавані товара в корзину");
      throw error;
    }
  }

  if (isLoading || !product) return <p>Завантаження...</p>;

  const mainImg = mainImgResolver(product.images);

  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <div className={styles.gallery}>
          <img
            className={styles.image}
            src={mainImg?.image}
            alt={mainImg?.alt}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>

          {/* <div className={styles.stock}>
            {product.quantity > 0 ? "✔ В наявності" : "✖ Немає в наявності"}
          </div> */}

          {product.is_available ? (
            <div className={styles.stock}>✔ В наявності</div>
          ) : (
            <div className={styles.notInStock}>✖ Немає в наявності</div>
          )}

          <div className={styles.priceBlock}>
            {product.discount ? (
              <>
                <span className={styles.newPrice}>
                  {Number(product.price) - Number(product.discount)}₴
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
            <Button size="lg" onClick={handeleAddToCart}>
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
