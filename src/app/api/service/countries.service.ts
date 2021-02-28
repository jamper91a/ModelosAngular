import {Injectable} from '@angular/core';
import {Api, Util} from '../../providers/providers';
import {GetCountriesResponse} from '../responses/countries/GetCountriesResponse';

;

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl = 'countries'
  constructor(
      private util: Util,
      private api: Api
  ) {

  }

  public async getCountries(): Promise<GetCountriesResponse> {
    const self = this;
    try {
      // @ts-ignore
      const response: GetCountriesResponse = await this.api.get(this.baseUrl, {}).toPromise();

      // @ts-ignore
      return response;
    } catch (e) {
      // self.util.showToast('Email / password does not match');
      throw e;
    }
  }
}
