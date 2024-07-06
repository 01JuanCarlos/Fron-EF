import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ReactiveFormsModule } from '@angular/forms';
// HttpClientModule nos permite trabajar con rutas http
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ComputadoraService } from './Services/computadora.service';
import { ScriptsService } from './Services/scripts/scripts.service';
//
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//
import {MatButtonModule} from '@angular/material/button';
//
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateComponent } from './conponents/create/create.component';
import { MenuComponent } from './conponents/menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    MenuComponent

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule
  ],
  providers: [ComputadoraService,ScriptsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
