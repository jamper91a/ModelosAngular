import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CrearAnfitrionComponent} from './crear/crearAnfitrion.component';
import {EditarAnfitrionComponent} from './editar/editarAnfitrion.component';

const routes: Routes = [
  {path: 'crear', component: CrearAnfitrionComponent},
  {path: 'editar', component: EditarAnfitrionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnfitrionesRoutingModule { }
