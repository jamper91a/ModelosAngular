import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaisesResponse} from '../../../api/responses/PaisesResponse';
import {CrearAnfitrionRequest} from '../../../api/requests/anfitriones/CrearAnfitrionRequest';
import {UsuariosService} from '../../../api/service/usuarios.service';
import {ActualizarUsuarioRequest} from '../../../api/requests/usuarios/ActualizarUsuarioRequest';
import {ActualizaAnfitrionRequest} from '../../../api/requests/anfitriones/ActualizaAnfitrionRequest';
import {AnfitrionesService} from '../../../api/service/anfitriones.service';


export interface PeriodicElement {
  id: number;
  nombre: string;
  prohibido: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1,  nombre: 'Hydrogen', prohibido: true},
  {id: 2,  nombre: 'Helium', prohibido: true},
  {id: 3,  nombre: 'Lithium', prohibido: true},
  {id: 4,  nombre: 'Beryllium', prohibido: true},
  {id: 5,  nombre: 'Boron', prohibido: true},
  {id: 6,  nombre: 'Carbon', prohibido: true},
  {id: 7,  nombre: 'Nitrogen', prohibido: true},
  {id: 8,  nombre: 'Oxygen', prohibido: true},
  {id: 9,  nombre: 'Fluorine', prohibido: true},
  {id: 10, nombre: 'Neon', prohibido: true}
];


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarAnfitrionComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    public usuariosService: UsuariosService,
    public anfitrionesService: AnfitrionesService
  ) { }
  displayedColumns: string[] = ['id', 'nombre', 'prohibido'];
  dataSource = ELEMENT_DATA;

  hide = true;
  usuarioForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl({value: 'jamper91@hotmail.com', disabled: true}, [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(5)]),
    rpassword: new FormControl('', [Validators.minLength(5)]),
  });

  anfitrionForm = new FormGroup({
    perfil: new FormControl('', [Validators.required])
  });

  public requestPaises: PaisesResponse = null;
  public actualizarUsuarioRequest: ActualizarUsuarioRequest = new ActualizarUsuarioRequest();
  public actualizarAnfitrionRequest: ActualizaAnfitrionRequest = new ActualizaAnfitrionRequest();

  ngOnInit(): void {
  }

  async onUpdateAccount() {
    this.actualizarUsuarioRequest.nombre = this.usuarioForm.value.nombre;
    this.actualizarUsuarioRequest.password = this.usuarioForm.value.password;
    this.actualizarUsuarioRequest.rpassword = this.usuarioForm.value.rpassword;
    try {
      await this.usuariosService.actualizar(this.actualizarUsuarioRequest);
      alert('Ok');
    } catch (e) {
      console.error(e);
    }
  }
  async onUpdateProfile(){
      this.actualizarAnfitrionRequest.perfil = this.anfitrionForm.value.perfil;
    try {
      await this.anfitrionesService.actualizar(this.actualizarAnfitrionRequest);
      alert('Ok');
    } catch (e) {
      console.error(e);
    }
  }

  paisCambio(toggle, pais){
    if(toggle.checked){
      console.log(pais);
    } else{
      console.log(pais + 'banned');
    }
  }

}
