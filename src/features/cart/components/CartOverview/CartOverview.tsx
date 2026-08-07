import { useCart } from "@/features/cart";
import { BASE_URL } from "@/data/user-config.json";
import styles from "./CartOverview.module.scss";

import { useEffect, useState } from "react";
import type { Product } from "@/features/catalog/api";
import Button from "@/ui/Button/Button";
import { GoTrash } from "react-icons/go";
import InfoState from "@/components/InfoState/InfoState";
import Modal from "@/ui/Modal/Modal";
import ConfirmDialog from "@/ui/ConfirmDialog/ConfirmDialog";
import toast from "react-hot-toast";

export function CartOverview() {
  const { cartItems, error, loading, changeCartItemQuantity, deleteCartItem } =
    useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    async function getProducts() {
      const data = setProducts(await data.json());
    }
    getProducts();
  }, []);

  function handleCancel() {
    setIsDialogOpen(false);
    setIdToDelete(null);
  }

  function handleDeleteItem() {
    if (idToDelete !== null) {
      deleteCartItem(idToDelete);
    }

    setIsDialogOpen(false);
    setIdToDelete(null);

    toast.success("успішно забрано з корзини");
  }

  const cartProducts = cartItems.map((cartItem) => {
    const product = products.find(
      (productItem: Product) =>
        String(productItem.id) === String(cartItem.productId),
    );

    return { ...cartItem, product };
  });

  console.log(cartProducts);

  if (loading) {
    return (
      // <InfoState
      //   title="Завантаження..."
      //   message="Зачекайте, будь ласка, наші коти вже несуть вам пакети з вашими товарами, но у них ж лапки, тому це може зайняти трохи часу"
      //   situation="loading"
      // />
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>
          тут буде колись крутитись нормальній спінер, але наші коти ще не
          навчилися його робити, тому вони просто сплять і чекають поки ви
          підете, щоб вони могли спокійно спати далі
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <InfoState
        title="Помилочка..."
        message="Вибачте, але щось пішло не так, наші коти намагаються виправити ситуацію, але це може зайняти трохи часу, бо вони милинько сплять, тому трохи почекайте"
        situation="error"
      />
    );
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
                onClick={() => {
                  setIsDialogOpen(true);
                  setIdToDelete(cartProduct.id);
                }}
              >
                <GoTrash />
              </Button>
            </div>
          </div>
        ))
      ) : (
        <InfoState
          title="корзина щось порожння"
          message="тут нема нічого, тому погнав дивитись і купляти корм"
          situation="emptyCart"
        />
      )}

      <ConfirmDialog
        question="Ви дійсно хочете видалити цей товар з корзини?"
        cancelText="Скасувати"
        confirmText="Видалити"
        isDialogOpen={isDialogOpen}
        onCancel={handleCancel}
        onConfirm={handleDeleteItem}
      />
    </div>
  );
}
