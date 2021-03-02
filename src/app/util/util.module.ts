import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingModalComponent} from './modal/loading-modal/loading-modal.component';
import {MaterialModule} from '../material.module';
import {HostsCardComponent} from './anfitriones/hosts-card/hosts-card.component';


@NgModule({
  declarations: [
    LoadingModalComponent,
    HostsCardComponent
  ],
  exports: [
    HostsCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class UtilModule { }
