import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CrearEspectadorComponent} from './crear/crearEspectador.component';

const routes: Routes = [
  {path: 'crear', component: CrearEspectadorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspectadoresRoutingModule { }
