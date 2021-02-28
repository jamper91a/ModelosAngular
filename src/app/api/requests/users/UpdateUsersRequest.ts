import {ModelosRequest} from '../ModelosRequest';

export class UpdateUsersRequest implements ModelosRequest {
    public name: string;
    public password: string;
    public rpassword: string;


    constructor() {
        this.name = '';
        this.password = '';
        this.rpassword = '';
    }

    getBody(): any {
        return {
            name: this.name,
            password: this.password,
            rpassword: this.rpassword
        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.name && !this.password) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean(): void {
        this.name = '';
        this.password = '';
        this.rpassword = '';
    }

}
