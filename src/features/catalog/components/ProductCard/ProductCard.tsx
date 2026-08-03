import type { Product } from "@/types/api/";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { styles } from "./ProductCard.styles";

import { useNavigate } from "react-router-dom";

interface ProductProps {
  // onToggleCart: (id: number) => void;
  product: Product | undefined;
}

// interface cartState {
//   addCard: boolean
//   onuUpdate: () => void
// }

export function ProductCard({ product }: ProductProps) {
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const { id, title, price, discount, images } = product;

  const mainImg = images.filter((image) => image.is_main).at(0);

  return (
    <Card sx={styles.cardContainer}>
      <CardMedia
        sx={styles.cardMedia}
        component="img"
        image="https://cdn.27.ua/sc--media--prod/default/5a/ed/c8/5aedc804-0c06-4c21-88cb-539dbef0fb7b.jpg"
        title={mainImg?.alt}
      />

      <CardContent>
        <Typography sx={styles.cardTitle} component="h3">
          {title}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
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
