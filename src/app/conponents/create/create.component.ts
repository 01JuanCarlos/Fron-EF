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
  id?: number;
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
    this.getProducts();

   }

   
  //Metodo que se ejucta al hacer submit en el formulario y guarda los datos a traves de nuestro servicio 
  onSubmit(form: any) {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
  
      // Verificar si existe formData.id para determinar si es una actualización o una creación
      if (formData.id) {
        // Es una actualización
        this._compuService.updateProject(formData).subscribe({
          next: respuesta => {
            console.log('Producto actualizado:', respuesta);
            form.reset(); // Opcional: limpiar el formulario después de actualizar
            this.getProducts(); // Recargar la lista de productos después de la actualización
          },
          error: error => {
            console.error('Error al actualizar producto:', error);
            // Manejar errores aquí
          }
        });
      } else {
        // Es una creación (aquí también podrías mantener tu lógica actual de creación)
        this.computer = new Computer(formData.nombre, formData.descripcion, formData.precio, formData.stock, formData.categoria, formData.fabricante);
        this._compuService.saveProducto(this.computer).subscribe({
          next: respuesta => {
            console.log('Producto guardado:', respuesta);
            form.reset(); // Opcional: limpiar el formulario después de guardar
            this.getProducts(); // Recargar la lista de productos después de guardar
          },
          error: error => {
            console.error('Error al guardar producto:', error);
            // Manejar errores aquí
          }
        });
      }
    }
  }
  
   updateForm(comp: any) {
    // Cargar los datos del computer seleccionado en el formulario para actualizar
    this.myForm.patchValue({
      id: comp.id,
      nombre: comp.nombre,
      descripcion: comp.descripcion,
      categoria: comp.categoria,
      precio: comp.precio,
      stock: comp.stock,
      fabricante: comp.fabricante
    });
    console.log(this.myForm);
  }

  //recolectamos los datos del formulario utilizando FormGroup
  form():FormGroup{
    return this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      precio:new FormControl(null,[Validators.required]),
      stock:['', [Validators.required]],
      fabricante:['', [Validators.required]]

    });
  }


  //obtenemos productos desde nuestro servicio
  /*getProducts(): void {
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



  getProducts(): void {
    if (!this.id || this.id === null) {
      // Si this.id no está definido o es 0, listar todos los productos
      this._compuService.getProduc().subscribe(
        response => {
          this.computers = response || []; // Asignar la respuesta al array computers
        },
        error => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      // Si this.id tiene un valor, obtener el producto por ese ID
      this.getProductId();
    }
  }


  
    // Obtener un producto por su ID
    getProductId(): void {
      if (this.id) {
        this._compuService.getProductId(this.id).subscribe(
          response => {
            this.computers = response ? [response] : []; // Asigna el producto encontrado a computers (en un array para mantener consistencia)
          },
          error => {
            console.error('Error fetching product by ID:', error);
          }
        );
      }
    }

    //Eliminamos productos por id
    deleteProjectId(id: number): void {
      if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        this._compuService.deleteProduct(id).subscribe(
          response => {
            console.log('Product deleted successfully:', response);
            // Aquí podrías realizar acciones adicionales después de borrar el producto
            // Por ejemplo, actualizar la lista de productos
          this.getProducts(); // Actualiza la lista después de eliminar
          },
          error => {
            console.error('Error deleting product:', error);
          }
        );
      }
    }


}

