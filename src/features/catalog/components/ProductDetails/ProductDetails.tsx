import Button from "@/ui/Button/Button";
import { useProductById } from "@/queries/catalog/useCatalogQueries";
import { mainImgResolver } from "@/utils/mainImgResolver";
import { styles } from "./ProductDetails.styles";
import { Box, IconButton, Slide, Typography } from "@mui/material";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { useState } from "react";

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
          <Box
            sx={{
              width: "100%",
              height: "100%",
              aspectRatio: "1",
              overflow: "hidden",
              position: "relative",
            }}
          >
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
                    sx={{ position: "absolute", top: 0, left: 0 }}
                  />
                </Slide>
              ))}
          </Box>

          {product.images.length > 1 && (
            <>
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: -10,
                  transform: "translateY(-50%)",

                  borderRadius: "50%",
                }}
                onClick={handlePrevious}
              >
                <GrCaretPrevious />
              </IconButton>
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: -10,
                  transform: "translateY(-50%)",

                  borderRadius: "50%",
                }}
                onClick={handleNext}
              >
                <GrCaretNext />
              </IconButton>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 1,
                }}
              >
                {product.images.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 10,
                      height: 10,
                      bgcolor:
                        activeStep === index ? "primary.main" : "lightgray",
                      borderRadius: "50%",
                    }}
                  ></Box>
                ))}
              </Box>
            </>
          )}
        </Box>

        <Box className="info">
          <Typography className="title" variant="h2">
            {product.title}
          </Typography>

          {product.is_available ? (
            <Typography className="stock" variant="body1">
              ✔ В наявності
            </Typography>
          ) : (
            <Typography className="notInStock" variant="body1">
              ✖ Немає в наявності
            </Typography>
          )}

          <Box className="priceBlock">
            {product.discount ? (
              <>
                <Typography className="newPrice" variant="body1">
                  {Number(product.price) - Number(product.discount)}₴
                </Typography>

                <Typography className="oldPrice" variant="body1">
                  {product.price}₴
                </Typography>
              </>
            ) : (
              <Typography className="newPrice" variant="body1">
                {product.price}₴
              </Typography>
            )}
          </Box>

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
      </Box>
    </Box>
  );
}
