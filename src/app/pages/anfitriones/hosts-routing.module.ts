import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateHostComponent} from './create/createHost.component';
import {EditHostComponent} from './edit/editHost.component';

const routes: Routes = [
  {path: 'create', component: CreateHostComponent},
  {path: 'edit', component: EditHostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostsRoutingModule { }
