import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Util} from '../../../providers/util';
import {CreateChatResponse} from '../../../api/responses/chats/create-chat.response';
import {ChatsService} from '../../../api/service/chats.service';
import * as OT from '@opentok/client';
import {SocketsService} from '../../../util/sockets/sockets-service';
import {UsersService} from '../../../api/service/users.service';
@Component({
  selector: 'app-public-chat',
  templateUrl: './public-chat.component.html',
  styleUrls: ['./public-chat.component.scss']
})
export class PublicChatComponent implements OnInit, OnDestroy {

  @ViewChild('video') videoEle:ElementRef;
  @ViewChild('chat') chatElm:ElementRef;


  public chat: CreateChatResponse = null;
  public connected = false;

  constructor(
    private chatsService: ChatsService,
    private socketsService:SocketsService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.joinRoom();
  }

  private joinRoom(){
    const roomName = `public-chat/${this.userService.getUser().id}`;
    this.socketsService.joinRoom(roomName);
  }

  public addMessage(message: string) {
    console.log('Adding new message');
    const html = `<tr><td>${message}</td></tr>`;
    this.chatElm.nativeElement.insertAdjacentHTML('beforeend', html);
  }

  async createVideoChat() {
    this.chat = await this.chatsService.createChat();
    Util.savePreference('chat', JSON.stringify(this.chat));
    this.initializeSession(this.chat);
  }

  async startBroadCast(){
    this.chatsService.broadCast(this.chat.chat.sessionId);
  }

  initializeSession(chat: CreateChatResponse){
    const self = this;
    var session = OT.initSession(chat.apiKey, chat.chat.sessionId);
    var publisher = OT.initPublisher('video', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, this.handleError);

    // Connect to the session
    session.connect(chat.token, function(error) {
      // If the connection is successful, publish to the session
      this.connected = true;
      if (error) {
        this.handleError(error);
      } else {
        session.publish(publisher, self.handleError);
      }
    });
  }

  handleError(error) {
    if (error) {
      alert(error.message);
    }
  }

  ngOnDestroy(): void {
    console.log('Stop Broadcasting');
  }

}
