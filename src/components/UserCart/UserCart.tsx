interface CartProps {
  count: number;
}

export default function Cart({ count }: CartProps) {
  return (
    <div>
      Корзина: {count}
    </div>
  );
}