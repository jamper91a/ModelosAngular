/* tslint:disable */
import {ModelosPojo} from './ModelosPojo';
import {Usuarios} from './Usuarios';
import {Paises} from './Paises';
import {PaisesBloqueados} from './PaisesBloqueados';

export class Anfitriones extends ModelosPojo {
    public saldo: number;
    public perfil: string;
    public Usuario: Usuarios;
    public PaisesBloqueados: PaisesBloqueados[];



}
