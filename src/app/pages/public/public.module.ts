import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {HomeComponent} from './home/home.component';
import {UtilModule} from '../../util/util.module';
import { HostComponent } from './host/host.component';
import {MaterialModule} from '../../material.module';


@NgModule({
  declarations: [
    HomeComponent,
    HostComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    UtilModule,
    MaterialModule
  ]
})
export class PublicModule { }
