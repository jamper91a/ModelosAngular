import { Injectable } from '@angular/core';
import {LoginRequest} from '../requests/usuarios/LoginRequest';
import {LoginResponse} from '../responses/LoginResponse';
import {Api, Util} from '../../providers/providers';
import {ActualizarUsuarioRequest} from '../requests/usuarios/ActualizarUsuarioRequest';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl = 'usuarios'
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
        Util.savePreference('token', response.token);
        Util.savePreference('user', JSON.stringify(response.usuario));
      }
      // @ts-ignore
      return response;
    } catch (e) {
      throw e;
    }
  }
  public async actualizar(request: ActualizarUsuarioRequest): Promise<Boolean> {
    const self = this;
    try {
      // @ts-ignore
      await this.api.post(this.baseUrl+'/actualizar', request.getBody()).toPromise();
      return;
    } catch (e) {
      // await dialog.dismiss();
      self.util.showToast('Email / password does not match');
      throw e;
    }
  }
}
