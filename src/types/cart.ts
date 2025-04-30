export type CartItem = {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  image: {
    url: string;
    alt: string;
  };
};
