import { ChatService } from './chat.service';
import { AuthGuard } from './Auth.guard';
import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages/module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
  { path: 'chat', component: ChatComponent, canActivate: [ AuthGuard ] },
  { path: 'chatroom', component: ChatRoomComponent, canActivate: [ AuthGuard ] },
  { path: 'private/chat', component: PrivateChatComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    PrivateChatComponent,
    ChatRoomComponent ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CollapseModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    FlashMessagesModule,
    NgbModule ],
  providers: [ FlashMessagesService, UserService, AuthGuard, ChatService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
