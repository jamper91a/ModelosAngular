import {ModelosResponse} from './ModelosResponse';
import {Countries} from '../pojo/Countries';
import {Hosts} from '../pojo/Hosts';

export class AuthUser {
  id: number;
  name: string;
  email: string;
  groupId: number;
  countryId: number;
  country: Countries;
  host: Hosts;
  spectator: any;
}

export class LoginResponse extends ModelosResponse {
    public user: AuthUser;
    public access_token: string;
}
