import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaisesResponse} from '../../../api/responses/PaisesResponse';
import {CrearAnfitrionRequest} from '../../../api/requests/anfitriones/CrearAnfitrionRequest';
import {UsuariosService} from '../../../api/service/usuarios.service';
import {ActualizarUsuarioRequest} from '../../../api/requests/usuarios/ActualizarUsuarioRequest';
import {ActualizaAnfitrionRequest} from '../../../api/requests/anfitriones/ActualizaAnfitrionRequest';
import {AnfitrionesService} from '../../../api/service/anfitriones.service';
import {ObtenerPerfilAnfitrionResponse} from '../../../api/responses/anfitriones/ObtenerPerfilAnfitrionResponse';
import {Paises} from '../../../api/pojo/Paises';
import {MatTableDataSource} from '@angular/material/table';


interface PaisesBloqueadoAux {
  id: number,
  nombre: string,
  bloqueado: boolean
}
const ELEMENT_DATA: PaisesBloqueadoAux[] = []


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
  displayedColumns: string[] = ['id', 'nombre', 'bloqueado'];


  hide = true;
  usuarioForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(5)]),
    rpassword: new FormControl('', [Validators.minLength(5)]),
  });

  anfitrionForm = new FormGroup({
    perfil: new FormControl('', [Validators.required])
  });

  public perfil: ObtenerPerfilAnfitrionResponse = null;
  public actualizarUsuarioRequest: ActualizarUsuarioRequest = new ActualizarUsuarioRequest();
  public actualizarAnfitrionRequest: ActualizaAnfitrionRequest = new ActualizaAnfitrionRequest();

  async ngOnInit() {
    await this.getData();
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
  dataSource = new MatTableDataSource<PaisesBloqueadoAux>(ELEMENT_DATA);
  async getData(){
    this.perfil = await this.anfitrionesService.obtenerPerfil();
    this.usuarioForm.controls['nombre'].setValue(this.perfil.anfitrion.Usuario.nombre);
    this.usuarioForm.controls['email'].setValue(this.perfil.anfitrion.Usuario.email);
    this.anfitrionForm.controls['perfil'].setValue(this.perfil.anfitrion.perfil);
    for(let paisBloqueado of this.perfil.anfitrion.PaisesBloqueados){
      console.log(paisBloqueado);
      const pais: Paises = paisBloqueado.Paise;
      ELEMENT_DATA.push({id: pais.id, nombre: pais.nombre, bloqueado: true});
    }
    this.dataSource.data = ELEMENT_DATA;
  }

}


