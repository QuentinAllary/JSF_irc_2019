import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: Http) { }

  saveUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3007/api/users', user, {headers});
  }

  login(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3007/api/login', user, {headers});
  }

  getUsers() {
    return this.http.get('http://localhost:3007/api/users');
  }

  getPrivateChat(username) {
    return this.http.get('http://localhost:3007/api/private/chat/' + username);
  }

  getChatRoomsChat(chatRoom) {
    return this.http.get('http://localhost:3007/api/chatroom/' + chatRoom);
  }

  loggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null;
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
