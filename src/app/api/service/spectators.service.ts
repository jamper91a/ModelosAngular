import {Injectable} from '@angular/core';
import {Api, Util} from '../../providers/providers';
import {UpdateHostRequest} from '../requests/hosts/UpdateHostRequest';
import {CreateSpectatorRequest} from '../requests/spectators/CreateSpectatorRequest';

@Injectable({
  providedIn: 'root'
})
export class SpectatorsService {

  private baseUrl = 'spectators'

  constructor(
      private util: Util,
      private api: Api
  ) {

  }

  public async createSpectator(request: CreateSpectatorRequest): Promise<Boolean> {
    try {
      await this.api.post(this.baseUrl, request.getBody()).toPromise();
      return true;
    } catch (e) {
      throw e;
    }
  }

  public async updateSpectator(spectatorId: number, request: UpdateHostRequest): Promise<Boolean> {
    try {
      await this.api.put(this.baseUrl+'/'+spectatorId, request.getBody()).toPromise();
      return;
    } catch (e) {
      throw e;
    }
    return
  }

}
