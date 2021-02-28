import {ModelosPojo} from './ModelosPojo';
import {Groups} from './Groups';
import {Countries} from './Countries';
import {Hosts} from './Hosts';

export class Users extends ModelosPojo {
    public email: string;
    public name: string;
    public password: string;
    public group: Groups;
    public groupId: number;
    public country: Countries;
    public countryId: number;
    public host: Hosts;
    // public spectator: Hosts;



}
