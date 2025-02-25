import { Component, OnInit } from '@angular/core';
import { Book as BookModel } from '../books/book.model';
import { CartItem } from './cart.model';
import { CartService } from './cart.service';
import { OrderService } from '../manage-orders/order.service';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  isLoading = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.cartService.getTotal().subscribe(total => {
      this.total = total;
    });
  }

  removeFromCart(book: BookModel) {
    this.cartService.removeFromCart(book);
  }

  updateQuantity(book: BookModel, quantity: number) {
    this.cartService.updateQuantity(book, quantity);
  }

  placeOrder() {
    const currentUser = this.userService.currentUser;
    if (currentUser === null) {
      alert('You need to log in first.');
      return;
    }

    if (currentUser) {
      const userId = currentUser.id;
      const cartItems = this.cartService.getCartItems();

      this.isLoading = true;

      setTimeout(() => {
        const order = this.orderService.createOrder(userId, cartItems);

        this.isLoading = false;

        if (order) {
          this.cartItems = [];
          this.cartService.clearCart();
          this.total = 0;
          this.cartItems = this.cartService.getCartItems();
        } else {
          alert('Order creation failed. Please try again later.');
        }
      }, 2000);
    }
  }


}
