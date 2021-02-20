import {ModelosResponse} from './ModelosResponse';
import {Usuarios} from '../pojo/Usuarios';


export class LoginResponse extends ModelosResponse {
    public usuario: Usuarios;
    public token: string;
}
