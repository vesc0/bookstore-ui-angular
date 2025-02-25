import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BooksComponent } from './books/books.component';
import { CartComponent } from './cart/cart.component';
import { BookService } from './books/book.service';
import { CartService } from './cart/cart.service';
import { UserService } from './auth/user.service';
import { ProfileComponent } from './auth/profile/profile.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrderService } from './manage-orders/order.service';
import { MatTableModule } from '@angular/material/table';
import { BookDetailComponent } from './book-detail/book-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    CarouselComponent,
    BooksComponent,
    CartComponent,
    ProfileComponent,
    WelcomeComponent,
    ManageOrdersComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatTableModule
  ],
  providers: [BookService, CartService, UserService, OrderService],
  bootstrap: [AppComponent],
  entryComponents: [ProfileComponent]
})
export class AppModule { }
