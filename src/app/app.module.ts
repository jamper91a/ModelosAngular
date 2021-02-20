import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Api, Util} from './providers/providers';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material.module';
import {ReactiveFormsModule} from '@angular/forms';

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
    ReactiveFormsModule
  ],
  providers: [
    Api,
    Util,
    HttpClientModule,
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
