import { ToastrService } from 'ngx-toastr';
import { ProductoService } from './../../services/producto.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor( private _productoService: ProductoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoService.getProductos().
    subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error =>{
      console.log(error);

    })
  }

  deleteProducto(id: any) {
    this._productoService.deleteProducto(id).subscribe(data =>{

      this.toastr.error('El producto fue eliminado exit', 'Producto eliminado');
      this.obtenerProductos();
    }, error =>{
      console.log(error);


    })
  }

}
