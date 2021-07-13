import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearComponent } from './components/crear/crear.component';
import { ListadoComponent } from './components/listado/listado.component';


const routes: Routes = [
 
  {   path: '', component: ListadoComponent  },
  {   path: 'crear', component: CrearComponent },    
  {   path: 'editar/:id', component: CrearComponent },
  {   path: '**', redirectTo: '', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
