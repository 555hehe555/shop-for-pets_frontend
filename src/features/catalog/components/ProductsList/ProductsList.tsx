import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductList.module.scss";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/data/user-config.json";

export interface Product {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
  discount?: number;
}

// interface ProductListProps {
//   handleToggleCart: (id: number) => void;
// }

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const data = await fetch(`${BASE_URL}/product`);
      setProducts(await data.json());
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
