export interface Product {
  id: number;
  name: string;
  category: string;
  shelf: string;
  level: number;
  quantity: number;
  price: number;
}

export interface Category {
  id: string;
  name: string;
}