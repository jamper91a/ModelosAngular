import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CrearAnfitrionComponent} from './crear/crearAnfitrion.component';

const routes: Routes = [
  {path: 'crear', component: CrearAnfitrionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnfitrionesRoutingModule { }
