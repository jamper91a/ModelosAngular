import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {HotsUpdatedDto} from './entities/hots-updated.dto';

@Injectable({
  providedIn: 'root'
})
export class AllEmitersService {
  invokeHostUpdated = new EventEmitter();
  subsHostUpdated: Subscription;



  constructor() {
  }

  onHostUpdated(data: HotsUpdatedDto) {
    console.log('onHostUpdated');
    this.invokeHostUpdated.emit(data);
  }


}
