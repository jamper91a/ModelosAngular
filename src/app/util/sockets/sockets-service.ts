import {Injectable} from '@angular/core';
import {SocketPublic} from './types/socket-public';
import {AllEmitersService} from '../../services/emmiters/all-emiters.service';
import {HotsUpdatedDto} from '../../services/emmiters/entities/hots-updated.dto';
import {UsersService} from '../../api/service/users.service';
import {Socket, SocketIoConfig} from 'ngx-socket-io';
import {environment} from '../../../environments/environment';
import {NewChatDto} from '../../services/emmiters/entities/new-chat.dto';

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
    //Event sent from BackEnd through Socket.io server
    this.socketUser.fromEvent("new-message").subscribe(function(data: any){
      self.emitersService.onNewPublicMessage(data);
    });
    //Event sent from Socket.io server (joinRoom.js)
    this.socketUser.fromEvent("user-joined").subscribe(function(data: any){
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
  public joinRoom(room: string){
    //User
    const user = this.usersService.getUser();
    this.socketUser.emit('joinRoom', {
      room,
      data:{
        userId: user.id,
        name: user.name,
        country: user.country
      }
    });
  }


}
