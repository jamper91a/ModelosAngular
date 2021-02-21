import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuariosService} from '../../../api/service/usuarios.service';
import {Util} from '../../../providers/util';
import {LoginResponse} from '../../../api/responses/LoginResponse';
import {PaisesResponse} from '../../../api/responses/PaisesResponse';
import {CrearAnfitrionRequest} from '../../../api/requests/anfitriones/CrearAnfitrionRequest';
import {AnfitrionesService} from '../../../api/service/anfitriones.service';
import {PaisesService} from '../../../api/service/paises.service';
import {EspectadoresService} from '../../../api/service/espectadores.service';

@Component({
  selector: 'app-crear-espectador',
  templateUrl: './crearEspectador.component.html',
  styleUrls: ['./crearEspectador.component.scss']
})
export class CrearEspectadorComponent implements OnInit {

  hide = true;
  crearEspectadorForm = new FormGroup({
    nombre: new FormControl('Jorge', [Validators.required]),
    email: new FormControl('jamper91@hotmail.com', [Validators.required, Validators.email]),
    password: new FormControl('84945SDSDd', [Validators.required, Validators.minLength(5)]),
    rpassword: new FormControl('84945SDSDd', [Validators.required, Validators.minLength(5)]),
    pais: new FormControl(0, [Validators.required]),
  });
  public requestPaises: PaisesResponse = null;
  public request: CrearAnfitrionRequest = new CrearAnfitrionRequest();
  constructor(
    private espectadoresService: EspectadoresService,
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

  async onCreate() {
    this.request.nombre = this.crearEspectadorForm.value.nombre;
    this.request.email = this.crearEspectadorForm.value.email;
    this.request.password = this.crearEspectadorForm.value.password;
    this.request.rpassword = this.crearEspectadorForm.value.rpassword;
    this.request.pais = this.crearEspectadorForm.value.pais;
    try {
      await this.espectadoresService.crearEspectador(this.request);
      alert('Espectador creado');
    } catch (e) {
      alert('No creado');
      console.error(e);
    }
  }

}
