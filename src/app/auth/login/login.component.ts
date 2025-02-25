import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorExists!: boolean;
  errorText = "";

  @Output() closeLogin = new EventEmitter<void>();

  constructor(private userService: UserService, private router: Router, private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm) {
    console.log(form);
    var email = form.value.email;
    var password = form.value.password;
    var user = this.userService.getUser(email);

    if (!user) {
      this.errorExists = true;
      this.errorText = "There is no registered user" + email;
      return;
    }

    var isPasswordValid = this.userService.isPasswordCorrect(email, password);
    if (!isPasswordValid) {
      this.errorExists = true;
      this.errorText = "Password is incorrect";
      return;
    }

    this.errorExists = false;
    this.router.navigate(['']);

  }

  onClose(): void {
    this.closeLogin.emit();
    this.dialogRef.close();
  }

  showLoginPopup: boolean = true;
  showSignupPopup: boolean = false;

  switchToSignup() {
    this.showLoginPopup = false;
    this.showSignupPopup = true;
  }

  switchToLogin() {
    this.showLoginPopup = true;
    this.showSignupPopup = false;
  }

  onSignupSuccess() {
    this.dialogRef.close();
  }
}
