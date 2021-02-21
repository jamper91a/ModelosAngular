import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { AnfitrionesRoutingModule } from './anfitriones-routing.module';
import { CrearAnfitrionComponent } from './crear/crearAnfitrion.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditarAnfitrionComponent } from './editar/editarAnfitrion.component';


@NgModule({
  declarations: [CrearAnfitrionComponent, EditarAnfitrionComponent],
  imports: [
    CommonModule,
    AnfitrionesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AnfitrionesModule { }
