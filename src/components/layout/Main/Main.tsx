import 'modern-normalize'


import { useState } from 'react'
import styles from './Main.module.scss'

import UserCart from '../../UserCart/UserCart.tsx'
import ProductList from '../../ProductsList.tsx'
import BasicBtn from '../../basicBtn/basicBtn.tsx'

export default function Main() {
  const [cartItems, setCartItems] = useState<number[]>([]);

  const handleToggleCart = (id: number) => {
    setCartItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      }

      return [...prev, id];
    });
  };

  return (
    <main>
      <BasicBtn 
        text='hello?' 
        onClick={() => alert("world!!")}
        variant='secondary'
        size='lg'
      />
      <ProductList handleToggleCart={handleToggleCart} />
      <UserCart count={cartItems.length} />
    </main>
  )
}