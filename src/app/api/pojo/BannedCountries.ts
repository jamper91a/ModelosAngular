/* tslint:disable */
import {ModelosPojo} from './ModelosPojo';
import {Hosts} from './Hosts';
import {Countries} from './Countries';

export class BannedCountries extends ModelosPojo {
    public host: Hosts;
    public hostId: number;
    public countryId: number;
    public country: Countries;



}
