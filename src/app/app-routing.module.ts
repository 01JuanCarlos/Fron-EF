import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './conponents/about/about.component';
import { ProjectsComponent } from './conponents/projects/projects.component';
import { CreateComponent } from './conponents/create/create.component';
import { ContactComponent } from './conponents/contact/contact.component';
import { ErrorComponent } from './conponents/error/error.component';

const routes: Routes = [
  {path:'',component:AboutComponent},
  {path:'sobre-mi',component:AboutComponent},
  {path:'proyectos',component:ProjectsComponent},
  {path:'crear-proyecto',component:CreateComponent},
  {path:'contactos',component:ContactComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
