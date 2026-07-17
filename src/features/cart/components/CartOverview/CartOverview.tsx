import { useCart } from "@/features/cart";
import { ProductCard } from "@/features/catalog";
import { BASE_URL } from "@/data/user-config.json";
import styles from "./CartOverview.module.scss";

import { useEffect, useState } from "react";
import type { Product } from "@/features/catalog/api";
import Button from "@/ui/Button/Button";
import { GoTrash } from "react-icons/go";

export function CartOverview() {
  const { cartItems, error, loading, changeCartItemQuantity, deleteCartItem } =
    useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const data = await fetch(`${BASE_URL}/product`);
      setProducts(await data.json());
    }
    getProducts();
  }, []);

  const cartProducts = cartItems.map((cartItem) => {
    const product = products.find(
      (productItem: Product) =>
        String(productItem.id) === String(cartItem.productId),
    );

    return { ...cartItem, product };
  });

  console.log(cartProducts);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className={styles.cartContainer}>
      {cartProducts.length > 0 ? (
        cartProducts.map((cartProduct) => (
          <div key={cartProduct.product?.id} className={styles.cartItem}>
            <div className={styles.cartItemLeft}>
              <img
                className={styles.cartItemImage}
                src={cartProduct.product?.imgUrl}
                alt={cartProduct.product?.name}
              />
              <h3 className={styles.cartitemName}>
                {cartProduct.product?.name}
              </h3>
            </div>

            <div className={styles.cartItemRight}>
              <div className={styles.cartItemQuantity}>
                <p className={styles.cartItemPrice}>
                  {(cartProduct.product?.price || 0) *
                    (cartProduct?.quantity || 0)}
                  ₴
                </p>
                <div className={styles.cartItemQuantityControls}>
                  <Button
                    size="xs"
                    onClick={() =>
                      changeCartItemQuantity(
                        String(cartProduct?.id),
                        (cartProduct?.quantity || 0) - 1,
                      )
                    }
                  >
                    -
                  </Button>
                  <span className={styles.cartItemQuantityValue}>
                    {cartProduct?.quantity || 0}
                  </span>
                  <Button
                    size="xs"
                    onClick={() =>
                      changeCartItemQuantity(
                        String(cartProduct?.id),
                        (cartProduct?.quantity || 0) + 1,
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                className={styles.cartItemDelete}
                color="danger"
                size="sm"
                onClick={() => deleteCartItem(String(cartProduct?.id))}
              >
                <GoTrash />
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>корзина порожння</p>
      )}
    </div>
  );
}
