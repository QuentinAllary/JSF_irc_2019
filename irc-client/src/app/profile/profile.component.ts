import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  constructor() { }

  ngOnInit() {
    console.log('USER_ITEM: ' + localStorage.getItem('user'));
    const User = JSON.parse(localStorage.getItem('user'));
    if (User != null) {
      this.user = User;
    }
  }

}
