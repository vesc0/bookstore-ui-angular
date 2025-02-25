import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book as BookModel } from '../books/book.model';
import { CartItem } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private totalSubject: Subject<number> = new Subject<number>();

  constructor() { }

  getCartItems() {
    return this.cartItems;
  }

  addToCart(book: BookModel, quantity: number = 1) {
    const existingCartItem = this.cartItems.find(item => item.book === book);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      this.cartItems.push({ book, quantity });
    }
    this.totalSubject.next(this.calculateTotal());
  }



  removeFromCart(book: BookModel) {
    const index = this.cartItems.findIndex(item => item.book.id === book.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.totalSubject.next(this.calculateTotal());
    }
  }

  updateQuantity(book: BookModel, quantity: number) {
    const cartItem = this.cartItems.find(item => item.book.id === book.id);
    if (cartItem) {
      cartItem.quantity = quantity;
      this.totalSubject.next(this.calculateTotal());
    }
  }

  getTotal() {
    return this.totalSubject.asObservable();
  }

  public calculateTotal() {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.book.price * item.quantity;
    }
    return total;
  }

  clearCart() {
    this.cartItems = [];
    this.calculateTotal();
  }
}
