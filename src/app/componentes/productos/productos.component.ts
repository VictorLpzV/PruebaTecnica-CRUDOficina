import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { Producto } from 'src/app/modelo/producto.model';
import { ProductoServicio } from 'src/app/servicios/producto.service';
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos:Producto[];
  producto:Producto={
    nombre:'',
    cantidad:0,
    precio:0
  };

  @ViewChild("productoForm")productoForm: NgForm;

  @ViewChild("botonCerrar")botonCerrar:ElementRef;

  constructor(private productosServicio: ProductoServicio,
    private flashMessages: FlashMessagesService 
    ) { }

  ngOnInit(): void {
    this.productosServicio.getProductos().subscribe(
      (productos) => {
        this.productos = productos;
      }
    )
  }

  agregar({value, valid}: {value:Producto, valid:boolean}){
    if(!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
     this.productosServicio.agregarProducto(value);
      this.productoForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }
}
