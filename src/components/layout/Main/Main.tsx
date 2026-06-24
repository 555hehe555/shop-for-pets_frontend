import { useState } from "react";
// import styles from "./Main.module.scss";

import UserCart from "../../UserCart/UserCart.tsx";
import ProductList from "../../ProductsList.tsx";
import Button from "../../Button/Button.tsx";
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

      <ProductList handleToggleCart={handleToggleCart} />
      <UserCart count={cartItems.length} />
    </main>
  );
}
