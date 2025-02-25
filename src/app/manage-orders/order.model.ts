import { CartItem } from "../cart/cart.model";

export interface Order {
    id: number;
    userId: number;
    items: CartItem[];
    orderDate: Date;
    status: string; 
  }