import {Injectable} from '@angular/core';
import {Api, Util} from '../../providers/providers';
import {CreateHostResponse} from '../responses/hosts/CreateHostResponse';

@Injectable({
  providedIn: 'root'
})
export class BannedCountriesServices {

  private baseUrl = 'banned-countries'

  constructor(
      private util: Util,
      private api: Api
  ) {

  }

  /**
   * Web service used by the host
   * @param countryId
   */
  public async addBannedCountry(countryId: number): Promise<CreateHostResponse> {
    const self = this;
    try {
      // @ts-ignore
      const response =
        await this.api.put(this.baseUrl+'/'+countryId, {}).toPromise();
        alert('Ok');
      return response;
    } catch (e) {
      // await dialog.close();
      // self.util.showToast('Email / password does not match');
      throw e;
    }
  }
  public async removeBannedCountry(countryId: number): Promise<CreateHostResponse> {
    const self = this;
    try {
      // @ts-ignore
      const response =
        await this.api.delete(this.baseUrl+'/'+countryId, {}).toPromise();
      alert('Ok');
      return response;
    } catch (e) {
      // await dialog.close();
      // self.util.showToast('Email / password does not match');
      throw e;
    }
  }
}
