import {ModelosRequest} from '../ModelosRequest';

export class CrearEspectadorRequest implements ModelosRequest {
  public nombre: string;
  public email: string;
  public password: string;
  public rpassword: string;
  public pais: number;


  constructor() {
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.rpassword = '';
    this.pais = 0;
  }

  getBody(): any {
    return {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rpassword: this.rpassword,
      pais: this.pais

    };
  }

  validate(): boolean {
    const error = new Error();
    // @ts-ignore
    error.code = 'VAL_FAIL';
    if (!this.email || !this.password || !this.nombre || this.pais === 0) {
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
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.rpassword = '';
    this.pais = 0;
  }

}
