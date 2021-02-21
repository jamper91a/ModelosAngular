import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingModalComponent} from './modal/loading-modal/loading-modal.component';
import {MaterialModule} from '../material.module';
import { AnfitrionCardComponent } from './anfitriones/anfitrion-card/anfitrion-card.component';



@NgModule({
  declarations: [
    LoadingModalComponent,
    AnfitrionCardComponent
  ],
  exports: [
    AnfitrionCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class UtilModule { }
