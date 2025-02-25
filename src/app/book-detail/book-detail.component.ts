import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book as BookModel } from '../books/book.model';
import { BookService } from '../books/book.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: BookModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.book = this.bookService.getBookById(id);
    });
    window.scrollTo(0, 0);
  }

  addToCart(book: BookModel, quantity: number = 1) {
    this.cartService.addToCart(book, quantity);
    this.cartService.calculateTotal();
    alert('Item added to cart');
  }

  getBookAverageRating(book: BookModel): string {
    if (book.ratingsCount && book.ratingsCount > 0) {
      const averageRating = book.rating! / book.ratingsCount;
      return `${averageRating.toFixed(2)} / 5`;
    } else {
      return 'No Ratings';
    }
  }
}
