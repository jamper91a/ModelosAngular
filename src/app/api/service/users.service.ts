import {Injectable} from '@angular/core';
import {LoginRequest} from '../requests/users/LoginRequest';
import {AuthUser, LoginResponse} from '../responses/LoginResponse';
import {Api, Util} from '../../providers/providers';
import {UpdateUsersRequest} from '../requests/users/UpdateUsersRequest';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'users';
  private user: AuthUser = null;
  private access_token: string = '';
  constructor(
      private util: Util,
      private api: Api
  ) {

  }

  public async login(request: LoginRequest): Promise<LoginResponse> {
    const self = this;
    try {
      // @ts-ignore
      const response: LoginResponse = await this.api.post('auth/login', request.getBody()).toPromise();
      // await dialog.dismiss();
      if (response) {
        Util.savePreference('access_token', response.access_token);
        Util.savePreference('user', JSON.stringify(response.user));
      }
      // @ts-ignore
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async refreshToken(): Promise<boolean> {
    const self = this;
    try {
      // @ts-ignore
      const response = await this.api.get('auth/refresh', {}).toPromise();
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async logOut(): Promise<LoginResponse> {
    const self = this;
    try {
      // @ts-ignore
      const response: LoginResponse = await this.api.get('auth/logout', {}).toPromise();
      // await dialog.dismiss();
      if (response) {
        Util.clearAllData();
      }
      // @ts-ignore
      return response;
    } catch (e) {
      throw e;
    }
  }
  public async updateUser(userId: number, request: UpdateUsersRequest): Promise<Boolean> {
    const self = this;
    try {
      // @ts-ignore
      await this.api.put(this.baseUrl+'/'+userId, request.getBody()).toPromise();
      return;
    } catch (e) {
      // await dialog.dismiss();
      throw e;
    }
  }

  public getUser(): AuthUser{
    if(this.user === null) {
      this.user = JSON.parse(this.util.getPreference('user'));
    }
    return this.user;

  }
  public getToken(): string{
    if(!this.access_token) {
      this.access_token = this.util.getPreference('access_token');
    }
    return this.access_token;

  }
}
