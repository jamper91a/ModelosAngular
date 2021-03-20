import {Injectable} from '@angular/core';
import {SocketPublic} from './types/socket-public';
import {AllEmitersService} from '../../services/emmiters/all-emiters.service';
import {HotsUpdatedDto} from '../../services/emmiters/entities/hots-updated.dto';
import {UsersService} from '../../api/service/users.service';
import {Socket, SocketIoConfig} from 'ngx-socket-io';
import {environment} from '../../../environments/environment';
import {NewChatDto} from '../../services/emmiters/entities/new-chat.dto';
import {SocketsEvents} from './sockets-events';
import {NewMessageDto} from './dto/new-message.dto';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  private socketUser: Socket = null;

  constructor(
    private socketPublic: SocketPublic,
    private emitersService:AllEmitersService,
    private usersService: UsersService
    ) {
    //Connect to userSocket if there is user data
    this.connectSocketUser();

  }

  public listenToPublicEvents() {
    const self = this;
    //Event sent from BackEnd through Socket.io server
    this.socketPublic.fromEvent("hostUpdated").subscribe(function(data: HotsUpdatedDto) {
      self.emitersService.onHostUpdated(data)
    });
    //Event sent from BackEnd through Socket.io server
    this.socketPublic.fromEvent('new-chat').subscribe(function(data: NewChatDto) {
      self.emitersService.onNewChat(data);
    });
  }



  public listenToUserEvents(){
    const self = this;
    //Event sent from Angular through Socket.io server
    this.socketUser.fromEvent(SocketsEvents.users.newMessage).subscribe(function(data: NewMessageDto){
      self.emitersService.onNewPublicMessage(data);
    });
    //Event sent from Socket.io server (joinRoom.js)
    this.socketUser.fromEvent(SocketsEvents.users.userJoined).subscribe(function(data: any){
      console.log('socket: user-joined', data);
      self.emitersService.onUserJoinChat(data);
    });

  }

  public connectSocketUser(){
    const user = this.usersService.getUser();
    if(user){
      let cfg: SocketIoConfig = {
        url: environment.socketUser,
        options: {
          query: {
            token: this.usersService.getToken()
          }
        }
      };
      this.socketUser = new Socket(cfg);
      this.socketUser.connect();
      this.listenToUserEvents();
    }

  }

  /**
   * Join to an specific room
   * @param room
   */
  public jointToChat(room: string){
    //User
    const user = this.usersService.getUser();
    this.socketUser.emit(SocketsEvents.users.joinToChat, {
      room,
      data:{
        userId: user.id,
        name: user.name,
        country: user.country
      }
    });
  }

  /**
   * Join to an specific room
   * @param room
   */
  public sendMessageToPublicRoom(room: string, message: string){
    //User
    const user = this.usersService.getUser();
    console.log('Sending message')
    this.socketUser.emit(SocketsEvents.users.sendMessageToPublicChat, {
      room,
      event: SocketsEvents.users.newMessage,
      data:{
        message,
        userId: user.id,
        name: user.name,
        country: user.country
      }
    });
  }


}
