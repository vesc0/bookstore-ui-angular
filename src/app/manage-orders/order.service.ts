import { Injectable } from "@angular/core";
import { Order } from "./order.model";
import { CartItem } from "../cart/cart.model";

@Injectable({
    providedIn: 'root'
  })
  export class OrderService {
    private orders: Order[] = [];
  
    constructor() { }
  
    createOrder(userId: number, items: CartItem[]): Order {
      const newOrder: Order = {
        id: this.orders.length + 1,
        userId,
        items: [...items],
        orderDate: new Date(),
        status: "Proccesing"
      };
  
      this.orders.push(newOrder);
      return newOrder;
    }
  
    getOrderHistory(userId: number): Order[] {
      return this.orders.filter(order => order.userId === userId);
    }
  }
  