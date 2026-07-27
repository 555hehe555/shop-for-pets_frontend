import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductList.module.scss";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/data/user-config.json";
import { fetchProducts, type Product } from "../../api";

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
    <ul className={styles.listCards}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          // onToggleCart={handleToggleCart}
        />
      ))}
    </ul>
  );
}
