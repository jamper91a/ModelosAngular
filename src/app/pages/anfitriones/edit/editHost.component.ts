import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GetCountriesResponse} from '../../../api/responses/countries/GetCountriesResponse';
import {UsersService} from '../../../api/service/users.service';
import {UpdateUsersRequest} from '../../../api/requests/users/UpdateUsersRequest';
import {UpdateHostRequest} from '../../../api/requests/hosts/UpdateHostRequest';
import {HostsServices} from '../../../api/service/hosts.services';
import {MatTableDataSource} from '@angular/material/table';
import {CountriesService} from '../../../api/service/countries.service';
import {HostsProfileResponse} from '../../../api/responses/hosts/HostsProfileResponse';
import {BannedCountriesServices} from '../../../api/service/banned-countries.services';


interface PaisesBloqueadoAux {
  id: number,
  name: string,
  banned: boolean
}
const ELEMENT_DATA: PaisesBloqueadoAux[] = []


@Component({
  selector: 'app-edit-host',
  templateUrl: './editHost.component.html',
  styleUrls: ['./editHost.component.scss']
})
export class EditHostComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    public usersService: UsersService,
    public hostsService: HostsServices,
    private countriesService: CountriesService,
    private bannedCountriesServices: BannedCountriesServices
  ) { }
  displayedColumns: string[] = ['id', 'name', 'banned'];


  hide = true;
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(5)]),
    rpassword: new FormControl('', [Validators.minLength(5)]),
  });

  hostsForm = new FormGroup({
    profile: new FormControl('', [Validators.required])
  });

  public hostsProfileResponse: HostsProfileResponse = null;
  public updateUsersRequest: UpdateUsersRequest = new UpdateUsersRequest();
  public updateHostRequest: UpdateHostRequest = new UpdateHostRequest();
  public getCountriesResponse: GetCountriesResponse = null;
  async ngOnInit() {
    await this.getData();
  }

  async onUpdateAccount() {
    this.updateUsersRequest.name = this.userForm.value.name;
    this.updateUsersRequest.password = this.userForm.value.password;
    this.updateUsersRequest.rpassword = this.userForm.value.rpassword;
    try {
      await this.usersService.updateUser(this.usersService.getUser().id, this.updateUsersRequest);
      alert('Ok');
    } catch (e) {
      console.error(e);
    }
  }
  async onUpdateProfile(){
      this.updateHostRequest.profile = this.hostsForm.value.profile;
    try {
      await this.hostsService.updateHost(this.usersService.getUser().id, this.updateHostRequest);
      alert('Ok');
    } catch (e) {
      console.error(e);
    }
  }

  async countryChanged(toggle, pais){
    console.log(toggle.checked);
    if(toggle.checked) {
      await this.bannedCountriesServices.addBannedCountry(pais);
    } else {
      await this.bannedCountriesServices.removeBannedCountry(pais);
    }
  }
  dataSource = new MatTableDataSource<PaisesBloqueadoAux>(ELEMENT_DATA);
  async getData(){
    this.hostsProfileResponse = await this.hostsService.profileHost(this.usersService.getUser().host.id);
    this.userForm.controls['name'].setValue(this.hostsProfileResponse.host.user.name);
    this.userForm.controls['email'].setValue(this.hostsProfileResponse.host.user.email);
    this.hostsForm.controls['profile'].setValue(this.hostsProfileResponse.host.profile);
    this.getCountriesResponse = await this.countriesService.getCountries();
    for(let pais of this.getCountriesResponse.countries){
      const aux = {id: pais.id, name: pais.name, banned: false};
      for(let paisBloqueado of this.hostsProfileResponse.host.bannedCountries){
        if(paisBloqueado.id === pais.id){
          aux.banned = true;
        }
      }
      ELEMENT_DATA.push(aux);
    }

    this.dataSource.data = ELEMENT_DATA;
    //Obtener paises

  }

}


