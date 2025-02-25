import { Component, OnInit } from '@angular/core';
import { Order } from './order.model';
import { UserService } from '../auth/user.service';
import { OrderService } from './order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orderHistory: Order[] = [];
  userId: number | null;
  displayedColumns: string[] = ['id', 'items', 'totalPrice', 'orderDate', 'status'];
  pageSize = 10;
  ratings: number[][] = [];

  constructor(private orderService: OrderService, private userService: UserService) {
    this.userId = this.userService.currentUser ? this.userService.currentUser.id : null;
  }

  ngOnInit() {
    if (this.userId !== null) {
      this.orderHistory = this.orderService.getOrderHistory(this.userId);
    }

  }

  initializeRatings() {
    for (const order of this.orderHistory) {
      const orderRatings = new Array(order.items.length).fill(0);
      this.ratings.push(orderRatings);
    }
  }

  submitRating(order: Order, itemIndex: number, bookIndex: number, rating: number) {
    const item = order.items[itemIndex];
    if (rating >= 1 && rating <= 5) {
      const book = item.book;
      if (book.rating === undefined) {
        book.rating = rating;
        book.ratingsCount = 1;
      } else {
        book.rating += rating;
        book.ratingsCount!++;
      }
    }
  }

  calculateTotalPrice(order: any): number {
    let totalPrice = 0;

    for (const item of order.items) {
      totalPrice += item.quantity * item.book.price;
    }

    if (totalPrice < 20) {
      totalPrice += 5;
    }

    return parseFloat(totalPrice.toFixed(2));
  }


}
