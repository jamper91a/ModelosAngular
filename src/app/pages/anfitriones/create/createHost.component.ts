import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Util} from '../../../providers/util';
import {CountriesService} from '../../../api/service/countries.service';
import {CreateHostRequest} from '../../../api/requests/hosts/CreateHostRequest';
import {GetCountriesResponse} from '../../../api/responses/countries/GetCountriesResponse';
import {HostsServices} from '../../../api/service/hosts.services';
import {CreateHostResponse} from '../../../api/responses/hosts/CreateHostResponse';

@Component({
  selector: 'app-crear-anfitrion',
  templateUrl: './createHost.component.html',
  styleUrls: ['./createHost.component.scss']
})
export class CreateHostComponent implements OnInit {

  hide = true;
  registrationForm = new FormGroup({
    name: new FormControl('Jorge', [Validators.required]),
    email: new FormControl('jamper91@hotmail.com', [Validators.required, Validators.email]),
    password: new FormControl('84945SDSDd', [Validators.required, Validators.minLength(5)]),
    rpassword: new FormControl('84945SDSDd', [Validators.required, Validators.minLength(5)]),
    countryId: new FormControl(0, [Validators.required]),
  });
  public countriesResponse: GetCountriesResponse = null;
  public request: CreateHostRequest = new CreateHostRequest();
  constructor(
    private anfitrionesService: HostsServices,
    private util: Util,
    private paisesService: CountriesService
  ) { }

  async ngOnInit() {
    await this.getData();
  }

  async getData(){
    //Obtener paises
    this.countriesResponse = await this.paisesService.getCountries();

  }

  async onCreate() {
    this.request.name = this.registrationForm.value.nombre;
    this.request.email = this.registrationForm.value.email;
    this.request.password = this.registrationForm.value.password;
    this.request.rpassword = this.registrationForm.value.rpassword;
    this.request.countryId = this.registrationForm.value.countryId;
    try {
      let redirectUrl = '';
      const response: CreateHostResponse  = await this.anfitrionesService.createHost(this.request);
      // if (response.usuario.group.id === 2) {
      //   await this.router.navigateByUrl('home');
      // } else{
      //   await this.util.showToast('Users no valid');
      // }
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

}
