import Button from "@/ui/Button/Button";
import { useProductById } from "@/queries/catalog/useCatalogQueries";
import { mainImgResolver } from "@/utils/mainImgResolver";
import { styles } from "./ProductDetails.styles";
import { Box } from "@mui/material";

export function ProductDetails({
  id,
  onAddToCartItem,
}: {
  id: number;
  onAddToCartItem: (id: number) => Promise<void>;
}) {
  const { data: product, isLoading } = useProductById(id);

  if (isLoading || !product) return <p>Завантаження...</p>;

  const mainImg = mainImgResolver(product.images);

  return (
    <Box sx={styles.container}>
      <div className="product">
        <div className="gallery">
          <img className="image" src={mainImg?.image} alt={mainImg?.alt} />
        </div>

        <div className="info">
          <h1 className="title">{product.title}</h1>

          {/* <div className={styles.stock}>
            {product.quantity > 0 ? "✔ В наявності" : "✖ Немає в наявності"}
          </div> */}

          {product.is_available ? (
            <div className="stock">✔ В наявності</div>
          ) : (
            <div className="notInStock">✖ Немає в наявності</div>
          )}

          <div className="priceBlock">
            {product.discount ? (
              <>
                <span className="newPrice">
                  {Number(product.price) - Number(product.discount)}₴
                </span>

                <span className="oldPrice">{product.price}₴</span>
              </>
            ) : (
              <span className="newPrice">{product.price}₴</span>
            )}
          </div>

          {product.discount ||
            (Number(product.discount ?? 0) > 0 && (
              <p className="discount">Ви економите {product.discount}₴</p>
            ))}

          <div className="actions">
            <Button size="lg" onClick={() => onAddToCartItem(id)}>
              Додати у кошик
            </Button>
          </div>
        </div>
      </div>

      <section className="description">
        <h2>Опис товару</h2>

        <p>
          Тут поки що буде опис товару. Потім ти просто підставиш
          product.description.
        </p>
      </section>
    </Box>
  );
}
