import { Box, Typography } from "@mui/material";

interface ProductPriceProps {
  price: number;
  discount?: number;
  className?: string;
}

export function ProductPrice({
  price,
  discount,
  className,
}: ProductPriceProps) {
  return (
    <Box className={className}>
      {discount ? (
        <>
          <Typography className="currentPrice" component="span">
            {(price - discount).toFixed(2)}₴
          </Typography>

          <Typography className="oldPrice" component="span">
            {price.toFixed(2)}₴
          </Typography>
        </>
      ) : (
        <>
          <Typography className="currentPrice" component="span">
            {price.toFixed(2)}₴
          </Typography>
        </>
      )}
    </Box>
  );
}
