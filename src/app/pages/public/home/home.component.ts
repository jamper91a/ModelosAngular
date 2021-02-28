import {Component, OnInit} from '@angular/core';
import {HostsServices} from '../../../api/service/hosts.services';
import {HostsByCountryRequest} from '../../../api/requests/hosts/HostsByCountryRequest';
import {HostsByCountryResponse} from '../../../api/responses/hosts/HostsByCountryResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public hostsByCountryResponse: HostsByCountryResponse = null;
  public hostsByCountryRequest: HostsByCountryRequest = new HostsByCountryRequest();
  constructor(public anfitrionesService: HostsServices) { }

  async ngOnInit() {
    await this.getData();
  }

  async getData(){
    //Get hosts
    this.hostsByCountryResponse = await this.anfitrionesService.hostsBtCountry(this.hostsByCountryRequest);
    console.log(this.hostsByCountryResponse.hosts[0]);

  }

}
