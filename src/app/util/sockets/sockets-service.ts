import {Injectable} from '@angular/core';
import {SocketPublic} from './types/socket-public';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  constructor( private socketPublic: SocketPublic) {}

  public listePubliEvents(){
    // this.socketPublic.f
    this.socketPublic.fromEvent("example").subscribe(function(data){
      console.log("example");
      console.log(data);
    });
  }


}
