import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {UsersService} from '../../../api/service/users.service';
import {HostsServices} from '../../../api/service/hosts.services';
import {CountriesService} from '../../../api/service/countries.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdateUsersRequest} from '../../../api/requests/users/UpdateUsersRequest';
import {GetCountriesResponse} from '../../../api/responses/countries/GetCountriesResponse';
import {MatTableDataSource} from '@angular/material/table';
import {HostsProfileResponse} from '../../../api/responses/hosts/HostsProfileResponse';


interface PaisesBloqueadoAux {
  id: number,
  nombre: string,
  bloqueado: boolean
}
const ELEMENT_DATA: PaisesBloqueadoAux[] = []

@Component({
  selector: 'app-editar-espectador',
  templateUrl: './editar-espectador.component.html',
  styleUrls: ['./editar-espectador.component.scss']
})
export class EditarEspectadorComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    public usuariosService: UsersService,
    public anfitrionesService: HostsServices,
    private paisesService: CountriesService
  ) { }
  displayedColumns: string[] = ['id', 'nombre', 'bloqueado'];


  hide = true;
  usuarioForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(5)]),
    rpassword: new FormControl('', [Validators.minLength(5)]),
  });



  public hostProfile: HostsProfileResponse = null;
  public actualizarUsuarioRequest: UpdateUsersRequest = new UpdateUsersRequest();
  public requestPaises: GetCountriesResponse = null;
  async ngOnInit() {
    await this.getData();
  }

  async onUpdateAccount() {
    this.actualizarUsuarioRequest.name = this.usuarioForm.value.nombre;
    this.actualizarUsuarioRequest.password = this.usuarioForm.value.password;
    this.actualizarUsuarioRequest.rpassword = this.usuarioForm.value.rpassword;
    try {
      await this.usuariosService.updateUser(this.usuariosService.getUser().id, this.actualizarUsuarioRequest);
      alert('Ok');
    } catch (e) {
      console.error(e);
    }
  }


  async paisCambio(toggle, pais){

  }
  dataSource = new MatTableDataSource<PaisesBloqueadoAux>(ELEMENT_DATA);
  async getData(){
    this.hostProfile = await this.anfitrionesService.profileHost(this.usuariosService.getUser().id);
    this.usuarioForm.controls['nombre'].setValue(this.hostProfile.host.user.name);
    this.usuarioForm.controls['email'].setValue(this.hostProfile.host.user.email);
    this.requestPaises = await this.paisesService.getCountries();
    // for(let pais of this.requestPaises.countries){
    //   const aux = {id: pais.id, name: pais.name, bloqueado: false};
    //   for(let paisBloqueado of this.hostProfile.host.bannedCountries){
    //     if(paisBloqueado.country.id === pais.id){
    //       aux.bloqueado = true;
    //     }
    //   }
    //   ELEMENT_DATA.push(aux);
    // }

    this.dataSource.data = ELEMENT_DATA;
    //Obtener paises

  }

}
