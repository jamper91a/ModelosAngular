import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingModalComponent} from './modal/loading-modal/loading-modal.component';
import {MaterialModule} from '../material.module';
import {HostsCardComponent} from './anfitriones/hosts-card/hosts-card.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';


@NgModule({
  declarations: [
    LoadingModalComponent,
    HostsCardComponent,
    HeaderComponent,
    MenuComponent
  ],
    exports: [
        HostsCardComponent,
        HeaderComponent
    ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class UtilModule { }
