import type { Product } from "@/types/api/";
import {
  Box,
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
      <CardActionArea onClick={() => navigate(`product/${id}`)}>
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

          <Box>
            {discount ? (
              <>
                <Typography className="currentPrice" component="span">
                  {Number(price) - Number(discount)}₴
                </Typography>

                <Typography className="oldPrice" component="span">
                  {price}₴
                </Typography>
              </>
            ) : (
              <>
                <Typography className="currentPrice" component="span">
                  {price}₴
                </Typography>
              </>
            )}
          </Box>
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

    // <li
    //   className={styles.cardContainer}
    //   onClick={() => navigate(`product/${id}`)}
    // >
    //   <img className={styles.cardImg} src={mainImg?.image} alt={mainImg?.alt} />

    //   <div className={styles.cardInfo}>
    //     <h3 className={styles.name}>{title}</h3>
    //     <div className={styles.price}>
    //       {discount ? (
    //         <>
    //           <span className={styles.newPrice}>
    //             {Number(price) - Number(discount)}₴
    //           </span>

    //           <span className={styles.oldPrice}>{price}₴</span>
    //         </>
    //       ) : (
    //         <>
    //           <span className={styles.allPrice}>{price}₴</span>
    //         </>
    //       )}
    //     </div>
    //     <>
    //       {discount && (
    //         <>
    //           <hr></hr>
    //           <p className={styles.discount}>Save - {discount}₴</p>
    //         </>
    //       )}
    //     </>
    //   </div>
    // </li>
  );
}
