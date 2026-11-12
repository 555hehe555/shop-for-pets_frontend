import Button from "@/ui/Button/Button";
import { useProductById } from "@/queries/catalog/useCatalogQueries";
import { styles } from "./ProductDetails.styles";
import { Box, IconButton, Slide, Typography } from "@mui/material";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { useState } from "react";
import { ProductPrice } from "../ProductPrice/ProductPrice";
import { FavouriteButton } from "@/features/favourite/components/FavouriteButton/FavouriteButton";

export function ProductDetails({
  id,
  onAddToCartItem,
}: {
  id: number;
  onAddToCartItem: (id: number) => Promise<void>;
}) {
  const { data: product, isLoading } = useProductById(id);

  const [activeStep, setActiveStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right",
  );

  function handleNext() {
    setSlideDirection("right");
    setActiveStep(
      (prevActiveStep) => (prevActiveStep + 1) % product!.images.length,
    );
  }

  function handlePrevious() {
    setSlideDirection("left");
    setActiveStep(
      (prevActiveStep) =>
        (prevActiveStep - 1 + product!.images.length) % product!.images.length,
    );
  }

  if (isLoading || !product) return <p>Завантаження...</p>;

  // const mainImg = mainImgResolver(product.images);
  console.log(product.images);

  return (
    <Box sx={styles.container}>
      <Box className="product">
        <Box className="gallery">
          <Box className="sliderWrapper">
            {product.images.length > 0 &&
              product.images.map((image, index) => (
                <Slide
                  key={index}
                  timeout={300}
                  in={index === activeStep}
                  direction={slideDirection}
                  mountOnEnter
                  unmountOnExit
                >
                  <Box
                    component="img"
                    className="image"
                    src={image.image}
                    alt={image?.alt}
                  />
                </Slide>
              ))}
          </Box>

          {product.images.length > 1 && (
            <>
              <IconButton
                className="navButton navButtonPrev"
                onClick={handlePrevious}
              >
                <GrCaretPrevious />
              </IconButton>
              <IconButton
                className="navButton navButtonNext"
                onClick={handleNext}
              >
                <GrCaretNext />
              </IconButton>
              <Box className="dots">
                {product.images.map((_, index) => (
                  <Box
                    key={index}
                    className={`dot ${activeStep === index ? "active" : ""}`}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>

        <Box className="info">
          <Typography className="title" variant="h2">
            {product.title}
          </Typography>

          <ProductPrice
            className="priceBlock"
            price={Number(product.price)}
            discount={Number(product.discount)}
          />

          <Typography
            className={
              "stock " + (product.is_available ? "available" : "notAvailable")
            }
            variant="body1"
          >
            {product.is_available ? "В наявності" : "Немає в наявності"}
          </Typography>

          <Box className="actions">
            <Button size="lg" onClick={() => onAddToCartItem(id)}>
              Додати у кошик
            </Button>
          </Box>
        </Box>
      </Box>

      <Box component="section" className="description">
        <Typography className="descriptionTitle" variant="h3">
          Опис товару
        </Typography>

        <Typography className="descriptionText" variant="body1">
          {product.description ||
            "На жаль, опис цього товару відсутній. Будь ласка, зверніться до продавця для отримання додаткової інформації."}
        </Typography>

        <FavouriteButton productId={id} />
      </Box>
    </Box>
  );
}
