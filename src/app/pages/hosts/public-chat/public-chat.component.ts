import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Util} from '../../../providers/util';
import {CreateChatResponse} from '../../../api/responses/chats/create-chat.response';
import {ChatsService} from '../../../api/service/chats.service';
import * as OT from '@opentok/client';
import {SocketsService} from '../../../util/sockets/sockets-service';
import {UsersService} from '../../../api/service/users.service';
import {HotsUpdatedDto} from '../../../services/emmiters/entities/hots-updated.dto';
import {AllEmitersService} from '../../../services/emmiters/all-emiters.service';
import {SubSink} from 'subsink';
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

  private subs = new SubSink();

  constructor(
    private chatsService: ChatsService,
    private socketsService:SocketsService,
    private userService: UsersService,
    private emitersService: AllEmitersService
  ) { }

  ngOnInit(): void {
    //Listener for users joining the chat
    if (this.emitersService.subsUserJoinChat === undefined) {
      this.emitersService.subsUserJoinChat =
        this.subs.sink =  this.emitersService.invokeUserJoinChat.subscribe((data: any) => {
          console.log('Hosts - user joined');
          console.log(data);

        });
    }
  }



  public addMessage(message: string) {
    console.log('Adding new message');
    const html = `<tr><td>${message}</td></tr>`;
    this.chatElm.nativeElement.insertAdjacentHTML('beforeend', html);
  }

  async createVideoChat() {
    this.chat = await this.chatsService.createChat();
    Util.savePreference('chat', JSON.stringify(this.chat));
    this.joinRoom(this.chat.chat.sessionId);
    // this.initializeSession(this.chat);
  }

    private joinRoom(session: string){
      const roomName = `public-chat/${session}`;
      // this.socketsService.joinRoom(roomName);
    }

  async startBroadCast(){
    await this.chatsService.broadCast(this.chat.chat.sessionId);
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
      self.connected = true;
      if (error) {
        self.handleError(error);
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
    this.subs.unsubscribe();
  }

}
