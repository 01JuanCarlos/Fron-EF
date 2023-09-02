import { AfterViewInit, Component, DoCheck, ElementRef, OnDestroy, OnInit, Renderer2,ViewChild  } from '@angular/core';
import { Project } from 'src/app/Models/project';
import { ProjectService } from 'src/app/Services/project.service';
import { ScriptsService } from 'src/app/Services/scripts/scripts.service';
import $ from 'jquery';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, FormArray } from '@angular/forms';
import { from } from 'rxjs';

// import{form_vali};
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent  implements AfterViewInit,OnInit,DoCheck,OnDestroy{
@ViewChild('myCheckbox') myCheckbox!:ElementRef;
  //cracion de Arreglos
    nombres:string[] = ['bulbasaur', 'charmander', 'squirtle'];
    img:string[] = ['../../../assets/img/bulbasaur.png','../../../assets/img/charmander.png','../../../assets/img/squirtle.png'];
    gif:string[]=['https://i.gifer.com/WnES.gif','https://media.tenor.com/whqWFg-nxdsAAAAM/pokemon-charmander.gif','https://i.gifer.com/origin/d8/d83e9951f28fc811c1166b16dcaec930_w200.gif']
  //union de Arrays
    pokedex = this.nombres.map((poke, index)=> 
    ({ poke,
      img: this.img[index],
      gif:this.gif[index],
      checked:false
    }
    ));
  //instanciamos clases 
    public project:Project;
  //variables publicas
    public binging='';
    public title:string;
    myForm: FormGroup;
    public status=false;
  //contructor
  constructor(private readonly formBuilder: FormBuilder,
            private renderer2:Renderer2,
            private _scripts:ScriptsService,
            private _projectService:ProjectService){
    this.myForm=this.form();
    this.cargarScripts();
    this.title='Crear proyecto'
    this.project=new Project('','','','');
  }
  
  cargarScripts(){
    //metodo para agregar scripts js
    this._scripts.cargar(['form_validation']);
  }
  
  form():FormGroup{
    return this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
      condiciones: ['', [Validators.required]],
      chekpokemon:new FormControl(null,[Validators.required]),
      foto:['', [Validators.required]],
      // Agrega otros campos aquí con sus validaciones
    });
  }

  ngOnInit(){
    //validamos los checkbox
  let getCheckedRadio=null
  this.pokedex.forEach(o=>{
    if(o.checked){
      getCheckedRadio=o.poke;
    }
  })
  this.myForm.addControl('chekpokemon', new FormControl(getCheckedRadio, [Validators.required])
  );

  } 

  ngAfterViewInit(): void {
      let Arraypokedex= this.pokedex
      let imagen=$('img');
      $('input[type="radio"]').on('click', function() {
        // Obtener el índice del (input-radio) seleccionado
        let indice = $(this).parent().index();
        //recorremos nuestro Arraypokedex para validar el indice
        for (let i = 0; i < imagen.length && i <  Arraypokedex.length; i++) {
          if (indice==i){
              imagen[i].setAttribute('src',Arraypokedex[i].gif);       
          }else 
          {
            imagen[i].setAttribute('src',Arraypokedex[i].img); 
          }
        }
      });
  } 

  ngOnDestroy(): void {
  }

  ngDoCheck(): void {
  } 


  onSubmit(form: any){
    if (this.myForm.valid==true) {
      this.status=true;
      $('#modal').css('display','block')
      this._scripts.img_verificacion();
      const formData = this.myForm.value;
      this.project=new Project(formData.usuario,formData.password,formData.chekpokemon,formData.foto);
      this._projectService.saveProject(this.project).subscribe(
        {
          next: respuesta => {
            console.log(respuesta);
          },
          error: error => {
            console.log('Error: ', error);
          }
        }
        )
      
    }
    
  }

  close_modal(){
    $('#modal').css('display','none')
  }
 

}

