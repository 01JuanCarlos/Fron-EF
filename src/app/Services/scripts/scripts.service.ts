import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {

  constructor() { }
/*  cargar(archivos:String[]){
    for(let archivo of archivos){
      let script=document.createElement('script');
      script.src='./assets/js/'+archivo+'.js';
      let body=document.getElementsByTagName('body')[0];
      body.appendChild(script);
    }
  }
 img_verificacion(){
    setTimeout(function timeout() {
      $('#img-chek').hide();
    }, 2000)
  }*/
}
