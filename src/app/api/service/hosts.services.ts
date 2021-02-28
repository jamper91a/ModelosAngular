import {Injectable} from '@angular/core';
import {LoginResponse} from '../responses/LoginResponse';
import {Api, Util} from '../../providers/providers';
import {CreateHostRequest} from '../requests/hosts/CreateHostRequest';
import {HostsByCountryRequest} from '../requests/hosts/HostsByCountryRequest';
import {UpdateHostRequest} from '../requests/hosts/UpdateHostRequest';
import {CreateHostResponse} from '../responses/hosts/CreateHostResponse';
import {HostsByCountryResponse} from '../responses/hosts/HostsByCountryResponse';
import {HostsProfileResponse} from '../responses/hosts/HostsProfileResponse';

@Injectable({
  providedIn: 'root'
})
export class HostsServices {

  private baseUrl = 'hosts'

  constructor(
      private util: Util,
      private api: Api
  ) {

  }

  public async createHost(request: CreateHostRequest): Promise<CreateHostResponse> {
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
  public async hostsBtCountry(request: HostsByCountryRequest): Promise<HostsByCountryResponse> {
    const self = this;
    // const dialog = await this.util.showDialog('Logging', true);
    try {
      // @ts-ignore
      const response: HostsByCountryResponse =
        await this.api.get(this.baseUrl+'/byCountry/'+request.countryCode, {}).toPromise();
      // await dialog.close();
      // @ts-ignore
      return response;
    } catch (e) {
      // await dialog.close();
      // self.util.showToast('Email / password does not match');
      throw e;
    }
  }

  public async updateHost(hostId: number, request: UpdateHostRequest): Promise<Boolean> {
    try {
      await this.api.put(this.baseUrl+'/'+hostId, request.getBody()).toPromise();
      return;
    } catch (e) {
      throw e;
    }
  }
  public async profileHost(hostId: number): Promise<HostsProfileResponse> {
    const self = this;
    // const dialog = await this.util.showDialog('Logging', true);
    try {
      // @ts-ignore
      const response: HostsProfileResponse =
        await this.api.get(this.baseUrl+'/profile/'+hostId, {}).toPromise();
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
