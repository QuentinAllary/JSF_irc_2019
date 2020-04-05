import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit {

  private receiver: string;
  private connectedUser: string;
  private chatroom;
  private message: string;
  messageArray: Array<{ user: string, message: string }> = [];
  private isTyping = false;

  constructor(private route: ActivatedRoute, private chatService: ChatService, private userService: UserService, private router: Router) {
    this.chatService.newUserJoined().subscribe(data => {
      console.log('j_MSG: ' + data.message);
      this.messageArray.push(data);
      this.isTyping = false;
    });

    this.chatService.newMessageReceived().subscribe(data => {
      this.messageArray.push(data);
      this.isTyping = false;
    });

    this.chatService.isTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
    });
  }

  ngOnInit() {
    this.receiver = this.route.snapshot.queryParamMap.get('name');
    this.connectedUser = this.userService.getLoggedInUser().userName;
    if (this.receiver < this.connectedUser) {
      this.chatroom = this.receiver.concat(this.connectedUser).replace(/\s/g, '');
    } else {
      this.chatroom = this.connectedUser.concat(this.receiver).replace(/\s/g, '');
    }
    this.chatService.joinRoom({ user: this.connectedUser, room: this.chatroom});

    this.userService.getPrivateChat(this.chatroom).subscribe(messages => {
      const allMessages = messages.json();

      allMessages.forEach((message) => {
        this.messageArray.push({ user: message.userName, message: message.text });
      });
    });
  }

  newMessage() {
    this.chatService.newMessage({ room: this.chatroom, user: this.connectedUser, message: this.message });
    this.message = '';
  }

  typing() {
    this.chatService.typing({ room: this.chatroom, user: this.connectedUser });
  }
}
