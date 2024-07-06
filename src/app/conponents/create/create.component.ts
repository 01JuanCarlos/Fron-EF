import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Computer } from 'src/app/Models/computer';
import { ComputadoraService } from 'src/app/Services/computadora.service';

// import{form_vali};
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent  implements OnInit{

  public computers:Computer[] = [];

//instanciamos clase computadora
  public computer:Computer;

  myForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _compuService:ComputadoraService ) {
      this.myForm=this.form();
    //inicializamos
    this.computer=new Computer('','',0.00,0,'','');
  }
 


  form():FormGroup{
    return this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      precio:new FormControl(null,[Validators.required]),
      stock:['', [Validators.required]],
      fabricante:['', [Validators.required]]

    });
  }





  ngOnInit(){
   this.getProjects();
  } 

  getProjects(): void {
    this._compuService.getProduc().subscribe(
      response => {
        if (response && response.length > 0) {
          this.computers = response;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form: any){
   if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.computer=new Computer(formData.nombre,formData.descripcion,formData.precio,formData.stock,formData.categoria,formData.fabricante);
      this._compuService.saveProducto(this.computer).subscribe(
        {
          next: respuesta => {
            console.log(respuesta);
            form.reset();
          },
          error: error => {
            console.log('Error: ', error);
          }
        }
        )
    

    }


     /*   this.computer=new Computer(
          "JS",
          "Laptop de 15.6 pulgadas con procesador Intel Core i5, 8GB RAM y 256GB SSD.",
          2500,
          10,
        "Electrónicos",
        "Acer"
        );
          console.log(this.computer);
        this._compuService.saveProducto(this.computer).subscribe(
          {
            next: respuesta => {
              console.log(this.computer);
              console.log(respuesta);
              form.reset();
            },
            error: error => {
              console.log('Error: ', error);
            }
          }
          )*/
 
  }



 

}

