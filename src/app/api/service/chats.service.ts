import {Injectable} from '@angular/core';
import {LoginRequest} from '../requests/users/LoginRequest';
import {AuthUser, LoginResponse} from '../responses/LoginResponse';
import {Api, Util} from '../../providers/providers';
import {UpdateUsersRequest} from '../requests/users/UpdateUsersRequest';
import {CreateChatResponse} from '../responses/chats/create-chat.response';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  private baseUrl = 'chats';
  constructor(
      private util: Util,
      private api: Api
  ) {

  }

  public async createChat(): Promise<CreateChatResponse> {
    const self = this;
    try {
      // @ts-ignore
      const newChat: CreateChatResponse = await this.api.post(this.baseUrl, {}).toPromise();
      return newChat;
    } catch (e) {
      // await dialog.dismiss();
      throw e;
    }
  }
  public async getChat(hostId: number): Promise<CreateChatResponse> {
    const self = this;
    try {
      // @ts-ignore
      const chat: CreateChatResponse = await this.api.get(this.baseUrl+ `/${hostId}`, {}).toPromise();
      return chat;
    } catch (e) {
      // await dialog.dismiss();
      throw e;
    }
  }
}
