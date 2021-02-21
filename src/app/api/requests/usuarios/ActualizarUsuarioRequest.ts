import {ModelosRequest} from '../ModelosRequest';

export class ActualizarUsuarioRequest implements ModelosRequest {
    public nombre: string;
    public password: string;
    public rpassword: string;


    constructor() {
        this.nombre = '';
        this.password = '';
        this.rpassword = '';
    }

    getBody(): any {
        return {
          nombre: this.nombre,
            password: this.password,
            rpassword: this.rpassword
        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.nombre && !this.password) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean(): void {
        this.nombre = '';
        this.password = '';
        this.rpassword = '';
    }

}
