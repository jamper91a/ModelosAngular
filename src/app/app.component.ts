import {Component} from '@angular/core';
import {SocketsService} from './util/sockets/sockets-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'modelosFrontEnd';
  constructor(public socketsService: SocketsService) {
    console.log('AppComponent');
    this.socketsService.listenToPublicEvents();
  }
}
