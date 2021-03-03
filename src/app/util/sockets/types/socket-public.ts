import { Injectable, NgModule } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class SocketPublic extends Socket {

  constructor() {
    console.log('SocketPublic');
    super({ url: environment.socketWeb, options: {
        withCredentials: false
      } });
  }

  listen(){

  }

}
