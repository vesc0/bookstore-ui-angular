import { Component, OnInit } from '@angular/core';
import { Book as BookModel } from './book.model';
import { BookService } from './book.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: BookModel[];
  selectedOrder: string;
  authorFilter: string = '';
  minPriceFilter: number | null = null;
  maxPriceFilter: number | null = null;
  categoryFilter: string = ''
  pageNumberFilter: number | null = null;
  publishingYearFilter: number | null = null;
  ratingFilter: number | null = null;
  loadingStates: { [bookId: number]: boolean } = {};
  filteredBooks: BookModel[] = [];

  constructor(private bookService: BookService, private cartService: CartService) {
    this.books = bookService.getBooks();
    this.selectedOrder = '';
  }
  ngOnInit(): void {
    this.loadBooks();
  }

  addToCart(book: BookModel, quantity: number = 1) {
    this.loadingStates[book.id] = true;

    this.cartService.addToCart(book, quantity);
    this.cartService.calculateTotal();

    setTimeout(() => {
      this.loadingStates[book.id] = false;
      alert('Item added to cart');
    }, 2000);
  }

  sortBooks(orderBy: string, order?: string) {
    if (orderBy === 'title') {
      this.filteredBooks.sort((a, b) => this.naturalSort(a.title, b.title));
    } else if (orderBy === 'author') {
      this.filteredBooks.sort((a, b) => this.naturalSort(a.author, b.author));
    } else if (orderBy === 'price') {
      if (order === 'desc') {
        this.filteredBooks.sort((a, b) => b.price - a.price);
      } else {
        this.filteredBooks.sort((a, b) => a.price - b.price);
      }
    }
  }

  naturalSort(a: string, b: string) {
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    return collator.compare(a, b);
  }

  togglePriceSort() {
    if (this.selectedOrder === 'asc') {
      this.selectedOrder = 'desc';
    } else {
      this.selectedOrder = 'asc';
    }
    this.sortBooks('price', this.selectedOrder);
  }

  getPriceSortIcon(): string {
    if (this.selectedOrder === 'asc') {
      return 'fa-chevron-up';
    } else {
      return 'fa-chevron-down';
    }
  }

  loadBooks() {
    this.books = this.bookService.getBooks();
    this.applyFilters();

  }

  applyFilters() {
    this.filteredBooks = this.books.filter(book =>
      book.author.toLowerCase().includes(this.authorFilter.toLowerCase()) &&
      (this.minPriceFilter === null || book.price >= this.minPriceFilter) &&
      (this.maxPriceFilter === null || book.price <= this.maxPriceFilter) &&
      (this.categoryFilter === '' || book.category === this.categoryFilter) &&
      (this.pageNumberFilter === null || book.pageNumber == this.pageNumberFilter) &&
      (this.publishingYearFilter === null || book.publishingYear == this.publishingYearFilter) &&
      (this.ratingFilter === null || (book.rating! / book.ratingsCount!) >= this.ratingFilter)
    );
  }

  getBookAverageRating(book: BookModel): string[] {
    if (book.ratingsCount && book.ratingsCount > 0) {
      const averageRating = book.rating! / book.ratingsCount;
      const fullStars = Math.floor(averageRating);
      const hasHalfStar = averageRating % 1 >= 0.5;

      let stars: string[] = [];

      for (let i = 0; i < fullStars; i++) {
        stars.push('bi bi-star-fill');
      }

      if (hasHalfStar) {
        stars.push('bi bi-star-half');
      }

      const totalStars = 5;
      while (stars.length < totalStars) {
        stars.push('bi bi-star');
      }

      return stars;
    } else {

      return Array(5).fill('bi bi-star');
    }
  }

}
