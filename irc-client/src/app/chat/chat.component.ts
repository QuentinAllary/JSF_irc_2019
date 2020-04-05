import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  Users;
  private connectedUser: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.connectedUser = this.userService.getLoggedInUser().userName;
    this.userService.getUsers().subscribe(users => {
      this.Users = users.json();
    });
  }

  getUser() {
    return this.userService.getLoggedInUser().userName;
  }
}
