import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material.module';

import {HostsRoutingModule} from './hosts-routing.module';
import {CreateHostComponent} from './create/createHost.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditHostComponent} from './edit/editHost.component';
import { PublicChatComponent } from './public-chat/public-chat.component';


@NgModule({
  declarations: [CreateHostComponent, EditHostComponent, PublicChatComponent],
  imports: [
    CommonModule,
    HostsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HostsModule { }
