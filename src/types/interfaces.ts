interface Product {
  _id: string,
  src: string,
  price: number,
  name: string,
  description: string,
}

export interface productModel extends Product {
  sale: boolean,
  oldPrice: number,
  inStock: number,
  additionalPhotos: string[],
}

export interface CartModel extends Product {
  quantity: number,
  comment?: string,
}

export interface OrderModel {
  _id: string,
  contact: string;
  address: string;
  payment: string;
  shipping: string;
  message: string;
  email: string;
  items: CartModel[];
  toPay: number;
}
