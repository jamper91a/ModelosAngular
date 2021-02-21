import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import {HomeComponent} from './home/home.component';
import {UtilModule} from '../../util/util.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    UtilModule
  ]
})
export class PublicModule { }
