/* tslint:disable */
import {ModelosPojo} from './ModelosPojo';
import {Users} from './Users';
import {BannedCountries} from './BannedCountries';

export class Hosts extends ModelosPojo {
    public balance: number;
    public profile: string;
    public user: Users;
    public userId: number;
    public approved: boolean;
    public banned: boolean;
    public bannedCountries: BannedCountries[];



}
