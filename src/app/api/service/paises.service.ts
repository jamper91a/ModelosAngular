import { Injectable } from '@angular/core';
import {LoginRequest} from '../requests/LoginRequest';
import {LoginResponse} from '../responses/LoginResponse';
import {Api, Util} from '../../providers/providers';
import {CrearAnfitrionRequest} from '../requests/anfitriones/CrearAnfitrionRequest';
import {PaisesResponse} from '../responses/PaisesResponse';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(
      private util: Util,
      private api: Api
  ) {

  }

  public async obtenerPaises(): Promise<PaisesResponse> {
    const self = this;
    const dialog = await this.util.showDialog('Logging', true);
    try {
      // @ts-ignore
      const response: PaisesResponse = await this.api.get('paises', {}).toPromise();
      await dialog.close();
      // @ts-ignore
      return response;
    } catch (e) {
      await dialog.close();
      // self.util.showToast('Email / password does not match');
      throw e;
    }
  }
}