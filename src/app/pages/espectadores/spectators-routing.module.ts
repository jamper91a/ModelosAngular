import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateSpectatorComponent} from './create/create-spectator.component';

const routes: Routes = [
  {path: 'create', component: CreateSpectatorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpectatorsRoutingModule { }
