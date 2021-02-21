import { Component, OnInit } from '@angular/core';
import {ObtenerAnfitrionesPorPaisResponse} from '../../../api/responses/anfitriones/ObtenerAnfitrionesPorPaisResponse';
import {AnfitrionesService} from '../../../api/service/anfitriones.service';
import {ObtenerAnfitrionesPorPaisRequest} from '../../../api/requests/anfitriones/ObtenerAnfitrionesPorPaisRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public anfitrionesPorPaisResponse: ObtenerAnfitrionesPorPaisResponse = null;
  public obtenerAnfitrionesPorPaisRequest: ObtenerAnfitrionesPorPaisRequest = new ObtenerAnfitrionesPorPaisRequest();
  constructor(public anfitrionesService: AnfitrionesService) { }

  async ngOnInit() {
    await this.getData();
  }

  async getData(){
    //Obtener paises
    this.anfitrionesPorPaisResponse = await this.anfitrionesService.obtenerAnfitrionesPorPais(this.obtenerAnfitrionesPorPaisRequest);
    console.log(this.anfitrionesPorPaisResponse.anfitriones[0]);

  }

}
