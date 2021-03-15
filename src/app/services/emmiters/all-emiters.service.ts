import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {HotsUpdatedDto} from './entities/hots-updated.dto';
import {NewPublicMessageDto} from './entities/new-public-message.dto';

@Injectable({
  providedIn: 'root'
})
export class AllEmitersService {
  invokeHostUpdated = new EventEmitter();
  invokeNewMessage = new EventEmitter();
  invokeUserJoinChat = new EventEmitter();
  subsHostUpdated: Subscription;
  subsNewMessage: Subscription;
  subsUserJoinChat: Subscription;



  constructor() {
  }

  onHostUpdated(data: HotsUpdatedDto) {
    console.log('onHostUpdated');
    this.invokeHostUpdated.emit(data);
  }
  onNewPublicMessage(data: NewPublicMessageDto) {
    console.log('onNewPublicMessage');
    this.invokeNewMessage.emit(data);
  }
  onUserJoinChat(data: any) {
    console.log('onUserJoinChat');
    this.invokeUserJoinChat.emit(data);
  }


}
