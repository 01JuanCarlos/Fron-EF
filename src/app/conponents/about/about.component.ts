import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
public title: string;
public subtitle:string;
public web:string;

constructor(){
this.title="Juan carlos"
this.subtitle='Desarrollador web y Full Stack';
this.web='JuanCarlosweb.es';
}

ngOnInit(){

}
}
