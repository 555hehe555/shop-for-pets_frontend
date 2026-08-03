import { ProductCard1 } from "../ProductCard/ProductCard.old";
import styles from "./ProductList.module.scss";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/data/user-config.json";
import type { Product } from "@/types/api";
import { fetchProducts } from "../../api";
import { Box, List } from "@mui/material";
import { ProductCard } from "../ProductCard/ProductCard";

// interface ProductListProps {
//   handleToggleCart: (id: number) => void;
// }

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }
    getProducts();
  }, []);

  console.log(products);

  return (
    //  className={styles.listCards}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: 3,
        gap: 3,
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          // onToggleCart={handleToggleCart}
        />
      ))}
    </Box>
  );
}
