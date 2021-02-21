import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspectadoresRoutingModule } from './espectadores-routing.module';
import { CrearEspectadorComponent } from './crear/crearEspectador.component';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CrearEspectadorComponent],
  imports: [
    CommonModule,
    EspectadoresRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EspectadoresModule { }
