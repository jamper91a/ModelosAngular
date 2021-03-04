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
  subsHostUpdated: Subscription;
  subsNewMessage: Subscription;



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


}
