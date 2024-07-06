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
  //arreglo tipo computaora bacio
  public computers:Computer[] = [];
  //instanciamos clase computadora
  public computer:Computer;
  //variables 
  id: number=0;
  myForm: FormGroup;
  //inicializamos servicios en el constructor 
  constructor(
    private fb: FormBuilder,
    private _compuService:ComputadoraService) {
    this.myForm=this.form();
    //inicializamos objeto computadora
    this.computer=new Computer('','',0.00,0,'','');
  }
 
 
  //metodo que se ejecuta por defecto al iniciar la pagina
  ngOnInit(){
    //this.getProducts();

   }

   
  //Metodo que se ejucta al hacer submit en el formulario y guarda los datos a traves de nuestro servicio 
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
   }


  //recolectamos los datos del formulario utilizando FormGroup
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


  //obtenemos productos desde nuestro servicio
 /* getProducts(): void {
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
*/

  //obtenemos productos por id desde nuestro servicio
 /* getProductId(): void {
    if (this.id) {
      this._compuService.getProductId(this.id).subscribe(
        response => {
          this.computer = response;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
*/
/*
  //Eliminamos productos por id
  deleteProjectId(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this._compuService.deleteProduct(id).subscribe(
        response => {
          console.log('Product deleted successfully:', response);
          // Aquí podrías realizar acciones adicionales después de borrar el producto
          // Por ejemplo, actualizar la lista de productos
       //   this.getProducts(); // Actualiza la lista después de eliminar
        },
        error => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

 */

}

