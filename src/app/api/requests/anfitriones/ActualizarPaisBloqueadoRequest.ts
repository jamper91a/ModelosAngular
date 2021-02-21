import {ModelosRequest} from '../ModelosRequest';

export class ActualizarPaisBloqueadoRequest implements ModelosRequest {
    public pais: number;
    public bloqueado: boolean;


    constructor() {
      this.pais = 0;
      this.bloqueado = null;
    }

    getBody(): any {
        return {
          pais: this.pais,
          bloqueado: this.bloqueado,

        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (this.bloqueado === null || this.pais === 0) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean(): void {
      this.pais = 0;
      this.bloqueado = null;
    }

}
