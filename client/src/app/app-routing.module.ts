import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componente lista de usuarios
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { UsuariosFormComponent } from "./components/usuarios-form/usuarios-form.component"
const routes: Routes = [
  {
    path : "",
    redirectTo : "/usuarios",
    pathMatch : "full"
  },
  {
    path : "usuarios",
    component : UsuariosListComponent
  },
  {
    path : "usuarios/add",
    component : UsuariosFormComponent
  },
  {
    path : "usuarios/edit/:id",
    component : UsuariosFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
