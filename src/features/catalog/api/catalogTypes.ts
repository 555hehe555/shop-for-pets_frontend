interface Image {
  id: number;
  image: string;
  alt: string;
  is_main: boolean;
}

export interface Product {
  id: number;
  title: string;
  price: string;
  is_available: boolean;

  images: Image[];
}
