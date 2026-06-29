import { useState } from "react";
// import styles from "./Main.module.scss";

import Button from "@/ui/Button/Button.tsx";
import { ProductsList } from "@/features/catalog";
import { UserCart } from "@/features/cart";
// import RegistrationForm from "../../RegistrationForm/RegistrationForm.tsx";
// import Modal from "../../Modal/Modal.tsx";

export default function Main() {
  const [cartItems, setCartItems] = useState<number[]>([]);

  const handleToggleCart = (id: number) => {
    setCartItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      }

      return [...prev, id];
    });
  };

  return (
    <main>
      <Button onClick={() => alert("world!!")} variant="secondary" size="lg">
        Hello?
      </Button>

      <ProductsList handleToggleCart={handleToggleCart} />
      <UserCart count={cartItems.length} />
    </main>
  );
}
