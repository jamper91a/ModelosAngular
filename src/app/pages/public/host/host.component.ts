import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Renderer} from '@angular/compiler-cli/ngcc/src/rendering/renderer';
import {ActivatedRoute} from '@angular/router';
import {SocketsService} from '../../../util/sockets/sockets-service';
import {AllEmitersService} from '../../../services/emmiters/all-emiters.service';
import {HotsUpdatedDto} from '../../../services/emmiters/entities/hots-updated.dto';
import {NewPublicMessageDto} from '../../../services/emmiters/entities/new-public-message.dto';
import * as OT from '@opentok/client';
import {CreateChatResponse} from '../../../api/responses/chats/create-chat.response';
import {ChatsService} from '../../../api/service/chats.service';
import * as Hls from 'hls.js';
import {SubSink} from 'subsink';
import {NewChatDto} from '../../../services/emmiters/entities/new-chat.dto';
import {NewMessageDto} from '../../../util/sockets/dto/new-message.dto';
import {Chats} from '../../../api/pojo/Chats';
import {FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit, OnDestroy {
  @ViewChild('chatMessages') chatMsgs:ElementRef;

  private id: number;
  private subs = new SubSink();
  public chat: CreateChatResponse

  public messages: NewMessageDto[] = [];

  messageForm = new FormGroup({
    message: new FormControl('', [Validators.required])
  });
  constructor(private route: ActivatedRoute,
              private socketsService:SocketsService,
              private chatsService: ChatsService,
              private emitersService: AllEmitersService) { }

  ngOnInit(): void {
    const self = this;
    this.subs.sink = this.route.params.subscribe(async (params) => {
      this.id = +params['id'];

      this.chat = await this.chatsService.getChat(this.id);
      this.joinRoom(this.chat.chat.sessionId);
      // this.initializeSession(chat);
      // @ts-ignore
      // this.play(chat.chat.broadcast.broadcastUrls.hls);
    });

    if (this.emitersService.subsNewMessage === undefined) {
      this.emitersService.subsNewMessage =
        this.subs.sink = this.emitersService.invokeNewMessage.subscribe((data: NewMessageDto) => {
          self.messages.push(data);
        });
    }
    if (this.emitersService.subsUserJoinChat === undefined) {
      this.emitersService.subsUserJoinChat =
        this.subs.sink =  this.emitersService.invokeUserJoinChat.subscribe((data: any) => {
          console.log('Host - user joined');
          console.log(data);

        });
    }
    if (this.emitersService.subsNewChat === undefined) {
      this.emitersService.subsNewChat =
        this.subs.sink =  this.emitersService.invokeNewChat.subscribe((data: NewChatDto) => {
          console.log('NewChat created');
          console.log(data);

        });
    }
  }

  public addMessage(message: string) {
    console.log('Adding new message');
    const html = `<tr><td>${message}</td></tr>`;
    this.chatMsgs.nativeElement.insertAdjacentHTML('beforeend', html);
  }

  public sendMessage(message) {

  }

  private joinRoom(session){
    this.socketsService.jointToChat(session);
  }

  initializeSession(chat: CreateChatResponse){
    var session = OT.initSession(chat.apiKey, chat.chat.sessionId);
    // Connect to the session
    session.connect(chat.token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        console.log("Error connecting: ", error.name, error.message);
      } else {
        console.log("Connected to the session.");
      }
    });
    session.on("streamCreated", function (event) {
      console.log("New stream in the session: " + event.stream.streamId);
      var subscriberProperties: any = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      };
      var subscriber = session.subscribe(event.stream,
        'publisher',
        subscriberProperties,
        function (error) {
          if (error) {
            console.log(error);
          } else {
            console.log('Subscriber added.');
          }
        });
    });

  }
  handleError(error) {
    if (error) {
      alert(error.message);
    }
  }

  play(source) {
    console.log(source);
    const video = document.getElementById('video');
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        // @ts-ignore
        video.play();
      });
    }
    // @ts-ignore
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // @ts-ignore
      video.src = source;
      video.addEventListener('loadedmetadata', function () {
        // @ts-ignore
        video.play();
      });
    }
  };

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSendMessage(){
    const message = this.messageForm.value.message;
    try {
      this.socketsService.sendMessageToPublicRoom(this.chat.chat.sessionId, message);
    } catch (e) {
      console.error(e);
    }
  }

}
