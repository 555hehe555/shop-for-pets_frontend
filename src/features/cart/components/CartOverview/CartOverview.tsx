import { useCart } from "@/features/cart";
import styles from "./CartOverview.module.scss";

import { useState } from "react";
import Button from "@/ui/Button/Button";
import { GoTrash } from "react-icons/go";
import InfoState from "@/components/InfoState/InfoState";
import ConfirmDialog from "@/ui/ConfirmDialog/ConfirmDialog";
import toast from "react-hot-toast";
import { mainImgResolver } from "@/utils/mainImgResolver";

export function CartOverview() {
  const { cartItems, error, loading, changeCartItemQuantity, deleteCartItem } =
    useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

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
      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => (
          <div key={cartItem.product} className={styles.cartItem}>
            <div className={styles.cartItemLeft}>
              <img
                className={styles.cartItemImage}
                src={mainImgResolver(cartItem.product_data.images)?.image || ""}
                alt={mainImgResolver(cartItem.product_data.images)?.alt || ""}
              />
              <h3 className={styles.cartitemName}>
                {cartItem.product_data.title}
              </h3>
            </div>

            <div className={styles.cartItemRight}>
              <div className={styles.cartItemQuantity}>
                <p className={styles.cartItemPrice}>
                  {(Number(cartItem.product_data.price) || 0) *
                    (cartItem.quantity || 0)}
                  ₴
                </p>
                <div className={styles.cartItemQuantityControls}>
                  <Button
                    size="xs"
                    onClick={() =>
                      changeCartItemQuantity(
                        cartItem?.product,
                        (cartItem?.quantity || 0) - 1,
                      )
                    }
                  >
                    -
                  </Button>
                  <span className={styles.cartItemQuantityValue}>
                    {cartItem?.quantity || 0}
                  </span>
                  <Button
                    size="xs"
                    onClick={() =>
                      changeCartItemQuantity(
                        cartItem?.product,
                        (cartItem?.quantity || 0) + 1,
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
                  setIdToDelete(cartItem.product);
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
