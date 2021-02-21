import { Injectable } from '@angular/core';
import {LoginResponse} from '../responses/LoginResponse';
import {Api, Util} from '../../providers/providers';
import {CrearAnfitrionRequest} from '../requests/anfitriones/CrearAnfitrionRequest';
import {ObtenerAnfitrionesPorPaisRequest} from '../requests/anfitriones/ObtenerAnfitrionesPorPaisRequest';
import {ActualizaAnfitrionRequest} from '../requests/anfitriones/ActualizaAnfitrionRequest';
import {ObtenerPerfilAnfitrionResponse} from '../responses/anfitriones/ObtenerPerfilAnfitrionResponse';

@Injectable({
  providedIn: 'root'
})
export class AnfitrionesService {

  private baseUrl = 'anfitriones'

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
      const response: LoginResponse =
        await this.api.post(this.baseUrl, request.getBody()).toPromise();
      // await dialog.close();
      // @ts-ignore
      return response;
    } catch (e) {
      // await dialog.close();
      // self.util.showToast('Email / password does not match');
      throw e;
    }
  }
  public async obtenerAnfitrionesPorPais(request: ObtenerAnfitrionesPorPaisRequest): Promise<any> {
    const self = this;
    // const dialog = await this.util.showDialog('Logging', true);
    try {
      // @ts-ignore
      const response: ObtenerAnfitrionesPorPaisResponse =
        await this.api.post(this.baseUrl+'/obtenerPorPais', request.getBody()).toPromise();
      // await dialog.close();
      // @ts-ignore
      return response;
    } catch (e) {
      // await dialog.close();
      // self.util.showToast('Email / password does not match');
      throw e;
    }
  }

  public async actualizar(request: ActualizaAnfitrionRequest): Promise<Boolean> {
    try {
      await this.api.post(this.baseUrl+'/actualizar', request.getBody()).toPromise();
      return;
    } catch (e) {
      throw e;
    }
  }
  public async obtenerPerfil(): Promise<ObtenerPerfilAnfitrionResponse> {
    const self = this;
    // const dialog = await this.util.showDialog('Logging', true);
    try {
      // @ts-ignore
      const response: ObtenerPerfilAnfitrionResponse =
        await this.api.get(this.baseUrl+'/obtener-perfil-anfitrion', {}).toPromise();
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
