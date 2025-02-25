import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LoginComponent } from '../auth/login/login.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileComponent } from '../auth/profile/profile.component';
import { UserService } from '../auth/user.service';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']

})
export class NavbarComponent implements OnInit {
  @ViewChild('navbar') navbar!: ElementRef;
  ngOnInit(): void {
  }
  isNavbarExpanded = false;

  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  constructor(public userService: UserService,
    private dialog: MatDialog,
    private elementRef: ElementRef,
    public bookService: BookService) { }

  isDialogOpen = false;
  dialogRef: MatDialogRef<LoginComponent> | null = null;

  openLoginPopup(): void {
    if (!this.isDialogOpen) {
      this.isDialogOpen = true;
      this.elementRef.nativeElement.classList.add('navbar-disable');

      const dialogRef = this.dialog.open(LoginComponent, {
        width: '300px',
        panelClass: 'dialog-panel'
      });

      dialogRef.afterClosed().subscribe(() => {
        this.isDialogOpen = false;
        this.elementRef.nativeElement.classList.remove('navbar-disable');
      });
    }
  }

  profileOpened: boolean = false;

  openProfile(userId: number) {
    this.profileOpened = true;
    const profileDialog = this.dialog.open(ProfileComponent, {
      disableClose: true,
      width: "25vw",
      data: { user: this.userService.getUserById(userId) }
    });

    profileDialog.afterClosed().subscribe(result => {
      this.profileOpened = false;
    })

  }
  showLogin = false;
  showSignup = false;
  closeLogin() {
    this.showLogin = false;
  }
  closeSignup() {
    this.showSignup = false;
  }

  @ViewChild('cartSidenav') cartSidenav!: MatSidenav;

  toggleCart() {
    this.cartSidenav.toggle();
  }

  isCartOpen: boolean = false;

  toggleCartSidenav() {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCartSidenav() {
    this.isCartOpen = false;
  }

  searchQuery: string = '';

  showSearchResults: boolean = false;

  performSearch() {
    this.bookService.performSearch(this.searchQuery);
    this.showSearchResults = true;
  }
}
