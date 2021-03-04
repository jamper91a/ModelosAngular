import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SpectatorsRoutingModule} from './spectators-routing.module';
import {CreateSpectatorComponent} from './create/create-spectator.component';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {EditarEspectadorComponent} from './edit/editar-espectador.component';


@NgModule({
  declarations: [CreateSpectatorComponent, EditarEspectadorComponent],
  imports: [
    CommonModule,
    SpectatorsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SpectatorsModule { }
