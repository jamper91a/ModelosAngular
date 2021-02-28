import {ModelosRequest} from '../ModelosRequest';

export class UpdateHostRequest implements ModelosRequest {
    public profile: string;


    constructor() {
        this.profile = '';
    }

    getBody(): any {
        return {
          profile: this.profile,
        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.profile) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean(): void {
        this.profile = '';
    }

}
