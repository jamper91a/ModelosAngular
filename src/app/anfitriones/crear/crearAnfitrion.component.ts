import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from '../../api/requests/LoginRequest';
import {UserService} from '../../api/service/user.service';
import {Util} from '../../providers/util';
import {LoginResponse} from '../../api/responses/LoginResponse';
import {PaisesService} from '../../api/service/paises.service';
import {CrearAnfitrionRequest} from '../../api/requests/anfitriones/CrearAnfitrionRequest';
import {Paises} from '../../api/pojo/Paises';
import {PaisesResponse} from '../../api/responses/PaisesResponse';

@Component({
  selector: 'app-crear',
  templateUrl: './crearAnfitrion.component.html',
  styleUrls: ['./crearAnfitrion.component.scss']
})
export class CrearAnfitrionComponent implements OnInit {

  hide = true;
  loginForm = new FormGroup({
    nombre: new FormControl('Jorge', [Validators.required]),
    email: new FormControl('jamper91@hotmail.com', [Validators.required, Validators.email]),
    password: new FormControl('84945SDSDd', [Validators.required, Validators.minLength(5)]),
    rpassword: new FormControl('84945SDSDd', [Validators.required, Validators.minLength(5)]),
    pais: new FormControl(0, [Validators.required]),
  });
  public requestPaises: PaisesResponse = null;
  public request: CrearAnfitrionRequest = new CrearAnfitrionRequest();
  constructor(
    private userService: UserService,
    private util: Util,
    private paisesService: PaisesService
  ) { }

  async ngOnInit() {
    await this.getData();
  }

  async getData(){
    //Obtener paises
    this.requestPaises = await this.paisesService.obtenerPaises();

  }

  async onLogin() {
    this.request.email = this.loginForm.value.email;
    this.request.password = this.loginForm.value.password;
    try {
      let redirectUrl = '';
      const response: LoginResponse  = await this.userService.login(this.request);
      // if (response.usuario.group.id === 2) {
      //   await this.router.navigateByUrl('home');
      // } else{
      //   await this.util.showToast('Usuarios no valid');
      // }
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

}
