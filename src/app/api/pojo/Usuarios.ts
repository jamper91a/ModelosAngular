import {ModelosPojo} from './ModelosPojo';
import {Grupos} from './Grupos';
import {Paises} from './Paises';
import {Anfitriones} from './Anfitriones';

export class Usuarios extends ModelosPojo {
    public email: string;
    public nombre: string;
    public password: string;
    public grupo: Grupos;
    public pais: Paises;
    public anfitrion: Anfitriones;



}
