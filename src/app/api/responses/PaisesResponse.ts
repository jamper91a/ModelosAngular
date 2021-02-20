import {ModelosResponse} from './ModelosResponse';
import {Usuarios} from '../pojo/Usuarios';
import {Paises} from '../pojo/Paises';


export class PaisesResponse extends ModelosResponse {
    public paises: Paises[];
}
