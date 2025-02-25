import { Book as BookModel } from '../books/book.model';

export interface CartItem {
  book: BookModel;
  quantity: number;
}
