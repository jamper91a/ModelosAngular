
// @ts-ignore
export class LoginRequest implements ModelosRequest {
    public email: string;
    public password: string;


    constructor() {
        this.email = '';
        this.password = '';
    }

    getBody(): any {
        return {
            email: this.email,
            password: this.password
        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.email && !this.password) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean(): void {
        this.email = '';
        this.password = '';
    }

}
