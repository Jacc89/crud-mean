import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Producto } from './../../models/producto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  Producto: FormGroup;
  titulo = 'crear producto';
  id : string | null ;

  constructor( private fb: FormBuilder,
               private router: Router,
               private toastr: ToastrService,
               private _productoService: ProductoService,
               private aRouter:ActivatedRoute) {

      this.Producto = this.fb.group({
      Producto:['', Validators.required],
      Categoria:['', Validators.required],
      Ubicacion:['', Validators.required],
      Precio:['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEdit();

  }

  addProduct(){
    console.log(this.Producto)
    console.log(this.Producto.get('Producto')?.value);

    const PRODUCTO: Producto = {
      nombre: this.Producto.get('Producto')?.value,
      categoria: this.Producto.get('Categoria')?.value,
      ubicacion: this.Producto.get('Ubicacion')?.value,
      precio: this.Producto.get('Precio')?.value,

    }

    if (this.id !== null) {
      //editamos producto
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data =>{
        this.toastr.success('El producto fue Actualizado satisfactoriamente', 'Producto Actualizado');
        this.router.navigate(['/']);

      }, error =>{
        console.log(error);
        this.Producto.reset();
      })

    }else{
      //agregamos producto
      console.log(PRODUCTO);

    this._productoService.addProducto(PRODUCTO).
    subscribe(data => {
      this.toastr.success('El producto fue registrado satisfactoriamente', 'Producto registrado');
    this.router.navigate(['/']);

    }, error =>{
      console.log(error);
      this.Producto.reset();
    })
    }

  }

  esEdit(){
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data =>{
        this.Producto.setValue({
          Producto: data.nombre,
          Categoria: data.categoria,
          Ubicacion: data.ubicacion,
          Precio: data.precio,
        })
      })
    }
  }

}
