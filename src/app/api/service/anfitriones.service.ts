import { Injectable } from '@angular/core';
import {LoginRequest} from '../requests/LoginRequest';
import {LoginResponse} from '../responses/LoginResponse';
import {Api, Util} from '../../providers/providers';
import {CrearAnfitrionRequest} from '../requests/anfitriones/CrearAnfitrionRequest';

@Injectable({
  providedIn: 'root'
})
export class AnfitrionesService {

  constructor(
      private util: Util,
      private api: Api
  ) {

  }

  public async crearAnfitrion(request: CrearAnfitrionRequest): Promise<any> {
    const self = this;
    // const dialog = await this.util.showDialog('Logging', true);
    try {
      // @ts-ignore
      const response: LoginResponse = await this.api.post('anfitriones', request.getBody()).toPromise();
      // await dialog.close();
      // @ts-ignore
      return response;
    } catch (e) {
      // await dialog.close();
      // self.util.showToast('Email / password does not match');
      throw e;
    }
  }
}
