import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CartComponent } from './cart/cart.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent},
  { path: '', component: WelcomeComponent},
  { path: 'cart', component: CartComponent},
  { path: 'manage-orders', component: ManageOrdersComponent},
  { path: 'books/:id', component: BookDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
