export class Computer {
  id: number = 0;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  fabricante: string;

  constructor(
    nombre: string,
    descripcion: string,
    precio: number,
    stock: number,
    categoria: string,
    fabricante: string
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
    this.fabricante = fabricante;
  }
}
