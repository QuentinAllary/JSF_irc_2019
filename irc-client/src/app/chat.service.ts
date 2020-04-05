import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() { }

  private socket = io('http://localhost:3007');

  /**
   * emitting signal when user joins a room
   */
  joinRoom(data) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    return new Observable<{ user: string, message: string }>((observer) => {
      this.socket.on('newUserJoined', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  /**
   * emitting signal when user leaves a room
   */
  leftRoom(data) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    return new Observable<{ user: string, message: string }>((observer) => {
      this.socket.on('userLeftRoom', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  /**
   * emitting signal when user sends a message
   */
  newMessage(data) {
    this.socket.emit('newMessage', data);
  }

  newMessageReceived() {
    return new Observable<{ user: string, message: string }>((observer) => {
      this.socket.on('newMessageReceived', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  /**
   * emitting signal when user is typing
   */
  typing(data) {
    this.socket.emit('typing', data);
  }

  isTyping() {
    return new Observable<{ isTyping: boolean }>(observer => {
      this.socket.on('isTyping', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
