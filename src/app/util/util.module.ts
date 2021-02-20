import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingModalComponent} from './modal/loading-modal/loading-modal.component';
import {MaterialModule} from '../material.module';



@NgModule({
  declarations: [
    LoadingModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class UtilModule { }
