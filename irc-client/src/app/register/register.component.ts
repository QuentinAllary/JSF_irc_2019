import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  usernameIsEmpty: boolean;
  emailIsEmpty: boolean;
  passwordIsEmpty: boolean;
  constructor(private userService: UserService, private flashMessageService: FlashMessagesService, private router: Router) { }

  ngOnInit() {
    this.usernameIsEmpty = false;
    this.emailIsEmpty = false;
    this.passwordIsEmpty = false;
  }

  registerNewUser() {
    this.usernameIsEmpty = false;
    this.emailIsEmpty = false;
    this.passwordIsEmpty = false;

    if (this.username === undefined || this.username === '') {
      this.usernameIsEmpty = true;
    }

    if (this.email === undefined || this.email === '') {
      this.emailIsEmpty = true;
    }

    if (this.password === undefined || this.password === '') {
      this.passwordIsEmpty = true;
    }

    if (this.usernameIsEmpty === false && this.emailIsEmpty === false && this.passwordIsEmpty === false) {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      this.userService.saveUser(user).subscribe(response => {
        if (response.json().user_already_signed_up === true) {
          this.flashMessageService.show('Username already taken.', { cssClass: 'alert-danger', timeout: 3000 });
        } else {
          this.flashMessageService.show('Successfully signed up. You can now login', { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
