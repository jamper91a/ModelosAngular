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
import {ActualizarPaisBloqueadoRequest} from '../../../api/requests/anfitriones/ActualizarPaisBloqueadoRequest';
import {PaisesService} from '../../../api/service/paises.service';


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
    public anfitrionesService: AnfitrionesService,
    private paisesService: PaisesService
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
  public requestPaises: PaisesResponse = null;
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

  async paisCambio(toggle, pais){
    const request:ActualizarPaisBloqueadoRequest = new ActualizarPaisBloqueadoRequest();
    request.bloqueado= toggle.checked;
    request.pais = pais;
    await this.anfitrionesService.actualizarPaisBloqueado(request);
  }
  dataSource = new MatTableDataSource<PaisesBloqueadoAux>(ELEMENT_DATA);
  async getData(){
    this.perfil = await this.anfitrionesService.obtenerPerfil();
    this.usuarioForm.controls['nombre'].setValue(this.perfil.anfitrion.Usuario.nombre);
    this.usuarioForm.controls['email'].setValue(this.perfil.anfitrion.Usuario.email);
    this.anfitrionForm.controls['perfil'].setValue(this.perfil.anfitrion.perfil);
    this.requestPaises = await this.paisesService.obtenerPaises();
    for(let pais of this.requestPaises.paises){
      const aux = {id: pais.id, nombre: pais.nombre, bloqueado: false};
      for(let paisBloqueado of this.perfil.anfitrion.PaisesBloqueados){
        if(paisBloqueado.Paise.id === pais.id){
          aux.bloqueado = true;
        }
      }
      ELEMENT_DATA.push(aux);
    }

    this.dataSource.data = ELEMENT_DATA;
    //Obtener paises

  }

}


