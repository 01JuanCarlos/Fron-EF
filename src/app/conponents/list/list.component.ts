import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Computer } from 'src/app/Models/computer';
import { ComputadoraService } from 'src/app/Services/computadora.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterContentChecked {
  public computers:Computer[] = [];
  id?:number;
  //instanciamos clase computadora
  public computer:Computer;


  constructor(private _compuService:ComputadoraService){
  //inicializamos objeto computadora
  this.computer=new Computer('','',0.00,0,'','');


  }
  ngAfterContentChecked(): void {
  }
  ngOnInit(): void {
     this.getProducts();
  }

 /* //obtenemos productosdesde nuestro servicio
  getProducts(): void {
    console.log(this.id);
    this._compuService.getProduc().subscribe(
      response => {
        if (response && response.length > 0) {
          if(this.id==null){
            this.computers = response;
            console.log(response);
          }else{
            console.log("response");
            this.getProductId();

          }
        }
      },
    
      error => {
        console.log(error);
      }
    );
  }

  //obtenemos productos por id desde nuestro servicio
  getProductId(): void {
    if (this.id) {
      console.log(this.id);
      this._compuService.getProductId(this.id).subscribe(
        response => {
          this.computer = response;
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
 }

*/

// Obtener productos según el valor de this.id
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
