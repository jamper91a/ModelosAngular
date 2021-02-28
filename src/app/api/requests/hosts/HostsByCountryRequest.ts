import {ModelosRequest} from '../ModelosRequest';

export class HostsByCountryRequest implements ModelosRequest {
    public countryCode: string;


    constructor() {
      this.countryCode = 'CO';
    }

    getBody(): any {
        return {
          countryId: this.countryCode

        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.countryCode) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean(): void {
      this.countryCode = 'Colombia';
    }

}
