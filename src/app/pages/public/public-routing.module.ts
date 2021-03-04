import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HostComponent} from './host/host.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'host/:id', component: HostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
