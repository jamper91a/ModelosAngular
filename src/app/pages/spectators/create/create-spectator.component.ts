import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Util} from '../../../providers/util';
import {GetCountriesResponse} from '../../../api/responses/countries/GetCountriesResponse';
import {CreateHostRequest} from '../../../api/requests/hosts/CreateHostRequest';
import {CountriesService} from '../../../api/service/countries.service';
import {SpectatorsService} from '../../../api/service/spectators.service';

@Component({
  selector: 'app-crear-espectador',
  templateUrl: './create-spectator.component.html',
  styleUrls: ['./create-spectator.component.scss']
})
export class CreateSpectatorComponent implements OnInit {

  hide = true;
  createForm = new FormGroup({
    name: new FormControl('Jorge', [Validators.required]),
    email: new FormControl('jamper91@hotmail.com', [Validators.required, Validators.email]),
    password: new FormControl('84945SDSDd', [Validators.required, Validators.minLength(5)]),
    rpassword: new FormControl('84945SDSDd', [Validators.required, Validators.minLength(5)]),
    countryId: new FormControl(0, [Validators.required]),
  });
  public getCountriesResponse: GetCountriesResponse = null;
  public createHostRequest: CreateHostRequest = new CreateHostRequest();
  constructor(
    private spectatorsService: SpectatorsService,
    private util: Util,
    private countriesService: CountriesService
  ) { }

  async ngOnInit() {
    await this.getData();
  }

  async getData(){
    //Obtener paises
    this.getCountriesResponse = await this.countriesService.getCountries();

  }

  async onCreate() {
    this.createHostRequest.name = this.createForm.value.name;
    this.createHostRequest.email = this.createForm.value.email;
    this.createHostRequest.password = this.createForm.value.password;
    this.createHostRequest.rpassword = this.createForm.value.rpassword;
    this.createHostRequest.countryId = this.createForm.value.countryId;
    try {
      await this.spectatorsService.createSpectator(this.createHostRequest);
      alert('Espectador creado');
    } catch (e) {
      alert('No creado');
      console.error(e);
    }
  }

}
