import {ModelosRequest} from '../ModelosRequest';

export class ActualizaAnfitrionRequest implements ModelosRequest {
    public perfil: string;


    constructor() {
        this.perfil = '';
    }

    getBody(): any {
        return {
          perfil: this.perfil,
        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.perfil) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean(): void {
        this.perfil = '';
    }

}
