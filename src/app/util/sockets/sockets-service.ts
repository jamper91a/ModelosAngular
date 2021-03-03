import {Injectable} from '@angular/core';
import {SocketPublic} from './types/socket-public';
import {AllEmitersService} from '../../services/emmiters/all-emiters.service';
import {HotsUpdatedDto} from '../../services/emmiters/entities/hots-updated.dto';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  constructor(
    private socketPublic: SocketPublic,
    private emitersService:AllEmitersService
    ) {}

  public listePubliEvents(){
    const self = this;
    this.socketPublic.fromEvent("hostUpdated").subscribe(function(data: HotsUpdatedDto){
      self.emitersService.onHostUpdated(data)
    });
  }


}
