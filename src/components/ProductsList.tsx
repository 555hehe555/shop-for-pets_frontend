import ProductCard from "./ProductCard/ProductCard.tsx";
import styles from "./ProductCard/ProductCard.module.scss";
import { products } from "../data/ListProducts.ts";

export interface Product {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
  discount?: number;
}

interface ProductListProps {
  handleToggleCart: (id: number) => void;
}

export default function ProductList({ handleToggleCart }: ProductListProps) {
  return (
    <ul className={styles.listCards}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onToggleCart={handleToggleCart}
        />
      ))}
    </ul>
  );
}
