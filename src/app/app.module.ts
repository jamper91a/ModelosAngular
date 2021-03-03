import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Api, Util} from './providers/providers';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {environment} from '../environments/environment';
import {SocketPublic} from './util/sockets/types/socket-public';
import {UtilModule} from './util/util.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SocketIoModule,
    UtilModule
  ],
  providers: [
    Api,
    Util,
    HttpClientModule,
    HttpClient,
    SocketPublic
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
