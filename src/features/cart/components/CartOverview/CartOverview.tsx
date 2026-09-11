import { useCart } from "@/features/cart";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

import Button from "@/ui/Button/Button";
import { GoTrash } from "react-icons/go";
import InfoState from "@/components/InfoState/InfoState";
import ConfirmDialog from "@/ui/ConfirmDialog/ConfirmDialog";
import toast from "react-hot-toast";
import { mainImgResolver } from "@/utils/mainImgResolver";
import { styles } from "./CartOverview.styles";

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
      <Box sx={styles.loadingContainer}>
        <Typography sx={styles.loadingText}>
          тут буде колись крутитись нормальній спінер, але наші коти ще не
          навчилися його робити, тому вони просто сплять і чекають поки ви
          підете, щоб вони могли спокійно спати далі
        </Typography>
      </Box>
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
    <Box sx={styles.cartContainer}>
      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => (
          <Box key={cartItem.product} sx={styles.cartItem}>
            <Box sx={styles.cartItemLeft}>
              <Box
                component="img"
                sx={styles.cartItemImage}
                src={mainImgResolver(cartItem.product_data.images)?.image || ""}
                alt={mainImgResolver(cartItem.product_data.images)?.alt || ""}
              />
              <Typography variant="h6" component="h3" sx={styles.cartitemName}>
                {cartItem.product_data.title}
              </Typography>
            </Box>

            <Box sx={styles.cartItemRight}>
              <Box sx={styles.cartItemQuantity}>
                <Typography sx={styles.cartItemPrice}>
                  {(Number(cartItem.product_data.price) || 0) *
                    (cartItem.quantity || 0)}
                  ₴
                </Typography>
                <Box sx={styles.cartItemQuantityControls}>
                  <Button
                    size="xs"
                    onClick={() =>
                      changeCartItemQuantity({
                        product: cartItem?.product,
                        quantity: (cartItem?.quantity || 0) - 1,
                      })
                    }
                  >
                    -
                  </Button>
                  <Typography component="span" sx={styles.cartItemQuantityValue}>
                    {cartItem?.quantity || 0}
                  </Typography>
                  <Button
                    size="xs"
                    onClick={() =>
                      changeCartItemQuantity({
                        product: cartItem?.product,
                        quantity: (cartItem?.quantity || 0) + 1,
                      })
                    }
                  >
                    +
                  </Button>
                </Box>
              </Box>

              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setIsDialogOpen(true);
                  setIdToDelete(cartItem.product);
                }}
              >
                <GoTrash />
              </Button>
            </Box>
          </Box>
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
    </Box>
  );
}
