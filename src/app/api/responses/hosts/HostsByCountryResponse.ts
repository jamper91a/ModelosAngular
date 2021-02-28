import {ModelosResponse} from '../ModelosResponse';
import {Hosts} from '../../pojo/Hosts';


export class HostsByCountryResponse extends ModelosResponse {
    public hosts: Hosts[];
}
