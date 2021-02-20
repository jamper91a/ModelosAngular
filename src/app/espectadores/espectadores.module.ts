import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspectadoresRoutingModule } from './espectadores-routing.module';
import { CrearComponent } from './crear/crear.component';


@NgModule({
  declarations: [CrearComponent],
  imports: [
    CommonModule,
    EspectadoresRoutingModule
  ]
})
export class EspectadoresModule { }
