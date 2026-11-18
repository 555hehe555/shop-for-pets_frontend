import type { Product } from "@/types/api/";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";

import { styles } from "./ProductCard.styles";

import { useNavigate } from "react-router-dom";
import { mainImgResolver } from "@/utils/mainImgResolver";
import { ProductPrice } from "../ProductPrice/ProductPrice";

interface ProductProps {
  product: Product | undefined;
}

export function ProductCard({ product }: ProductProps) {
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const { id, title, price, discount, images } = product;

  const mainImg = mainImgResolver(images);

  return (
    <Card sx={styles.cardContainer}>
      <CardActionArea onClick={() => navigate(`/product/${id}`)}>
        <CardMedia
          className="cardMedia"
          component="img"
          image={mainImg?.image}
          title={mainImg?.alt}
        />

        <CardContent className="cardInfo">
          <Typography className="cardTitle" component="h3">
            {title}
          </Typography>

          <ProductPrice price={Number(price)} discount={Number(discount)} />
          <>
            {discount && (
              <>
                <Divider />
                <Typography className="discount" component="p">
                  Save - {discount}₴
                </Typography>
              </>
            )}
          </>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
