import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {HotsUpdatedDto} from './entities/hots-updated.dto';
import {NewPublicMessageDto} from './entities/new-public-message.dto';
import {NewChatDto} from './entities/new-chat.dto';
import {NewMessageDto} from '../../util/sockets/dto/new-message.dto';

@Injectable({
  providedIn: 'root'
})
export class AllEmitersService {
  invokeHostUpdated = new EventEmitter();
  invokeNewMessage = new EventEmitter();
  invokeUserJoinChat = new EventEmitter();
  invokeNewChat = new EventEmitter();
  subsHostUpdated: Subscription;
  subsNewMessage: Subscription;
  subsUserJoinChat: Subscription;
  subsNewChat: Subscription;



  constructor() {
  }

  onHostUpdated(data: HotsUpdatedDto) {
    console.log('onHostUpdated');
    this.invokeHostUpdated.emit(data);
  }
  onNewPublicMessage(data: NewMessageDto) {
    console.log('onNewPublicMessage');
    this.invokeNewMessage.emit(data);
  }
  onUserJoinChat(data: any) {
    console.log('onUserJoinChat');
    this.invokeUserJoinChat.emit(data);
  }
  onNewChat(data: NewChatDto){
    this.invokeNewChat.emit(data)
  }


}
