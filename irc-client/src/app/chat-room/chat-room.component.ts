import { Component, OnInit } from '@angular/core';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  user: string;
  room: string;
  messageText: string;
  messageArray: Array<{ user: string, message: string }> = [ ];

  constructor(private chatService: ChatService) {
    this.chatService.newUserJoined().subscribe((data) => {
      this.messageArray.push(data);
    });

    this.chatService.userLeftRoom().subscribe((data) => {
      this.messageArray.push(data);
    });

    this.chatService.newMessageReceived().subscribe((data) => {
      this.messageArray.push(data);
    });
  }

  ngOnInit() {
  }

  join() {
    this.messageArray.push({ user: this.user, message: 'You have joined the room ' + this.room + '.' });
    this.chatService.joinRoom({ user: this.user, room: this.room });
  }

  leave() {
    this.messageArray.push({ user: this.user, message: 'You have left the room ' + this.room + '.' });
    this.chatService.leftRoom({ user: this.user, room: this.room });
  }

  sendMessage() {
    this.messageArray.push({ user: this.user, message: this.messageText });
    this.chatService.newMessage({ user: this.user, room: this.room, message: this.messageText });
  }
}
