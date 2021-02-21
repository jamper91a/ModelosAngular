import {ModelosRequest} from '../ModelosRequest';

export class ObtenerAnfitrionesPorPaisRequest implements ModelosRequest {
    public pais: string;


    constructor() {
      this.pais = 'CO';
    }

    getBody(): any {
        return {
          pais: this.pais

        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.pais) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean(): void {
      this.pais = 'Colombia';
    }

}
