import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from './auth/profile/profile.component';
import { UserService } from "./auth/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookstore-app';
  dialogOpened = false;
  profileOpened: boolean = false;

  constructor(public userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dialog.afterOpened.subscribe(() => {
      this.dialogOpened = true;
      document.body.classList.add('dialog-opened');
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.dialogOpened = false;
      document.body.classList.remove('dialog-opened');
    });
  }

  openProfile(userId: number){
    this.profileOpened = true;
    const profileDialog = this.dialog.open(ProfileComponent, {
      disableClose: true,
      width: "25vw",
      data: { user: this.userService.getUserById(userId)}
    });

    profileDialog.afterClosed().subscribe(result => {
      this.profileOpened = false;
    })

  }
}

