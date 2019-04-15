import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ModuloExemploModule } from './modulo-exemplo/modulo-exemplo.module';
import { AppComponent } from './app.component';
import { FormulariosModule } from './formularios/formularios.module';
import { AppRoutingModule } from './app-routing.module';

// import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { MaterializeComponent } from './materialize/materialize.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';


@NgModule({
  declarations: [
    AppComponent,
    MaterializeComponent,
    BootstrapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    ModuloExemploModule,
    FormulariosModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
