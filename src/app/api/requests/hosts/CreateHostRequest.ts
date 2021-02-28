import {ModelosRequest} from '../ModelosRequest';

export class CreateHostRequest implements ModelosRequest {
    public name: string;
    public email: string;
    public password: string;
    public rpassword: string;
    public countryId: number;


    constructor() {
      this.name = '';
      this.email = '';
      this.password = '';
      this.rpassword = '';
      this.countryId = 0;
    }

    getBody(): any {
        return {
          user: {
            name: this.name,
            email: this.email,
            password: this.password,
            rpassword: this.rpassword,
            countryId: this.countryId
          }


        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.email || !this.password || !this.name || this.countryId === 0) {
            error.message = 'fields_empty';
            throw error;
        }
        if(this.password !== this.rpassword) {
          error.message = 'passwords_no_coinciden';
          throw error;
        }
        return true;
    }

    clean(): void {
      this.name = '';
      this.email = '';
      this.password = '';
      this.rpassword = '';
      this.countryId = 0;
    }

}
