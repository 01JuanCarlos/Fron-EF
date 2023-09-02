import { DOCUMENT } from '@angular/common';
import { Component, Inject} from '@angular/core';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent {
  activetheme=false;

  constructor(@Inject(DOCUMENT) private document:Document){

  }

  change(newValue:boolean):void{
    if(newValue){
      this.document.body.classList.add('dark-mode');
    }else
    this.document.body.classList.remove('dark-mode');

  }
}
