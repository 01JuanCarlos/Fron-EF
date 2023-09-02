import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './conponents/about/about.component';
import { ProjectsComponent } from './conponents/projects/projects.component';
import { CreateComponent } from './conponents/create/create.component';
import { ContactComponent } from './conponents/contact/contact.component';
import { ErrorComponent } from './conponents/error/error.component';

import { ReactiveFormsModule } from '@angular/forms';
// HttpClientModule nos permite trabajar con rutas http
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProjectService } from './Services/project.service';
import { ScriptsService } from './Services/scripts/scripts.service';
//
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//
import {MatButtonModule} from '@angular/material/button';
//
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ThemesComponent } from './conponents/buttons/themes/themes.component';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent,
    ErrorComponent,
    ThemesComponent,
   
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
  providers: [ProjectService,ScriptsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
