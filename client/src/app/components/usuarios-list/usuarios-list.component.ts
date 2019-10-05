import { Component, OnInit } from '@angular/core';

import { UsuariosService } from "../../services/usuarios.service";
import { User } from '../../models/usuario';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  usuarios : any = [];

  constructor(private user : UsuariosService) { }

  ngOnInit() {
    this.obtenerListado();
  }
  
  obtenerListado(){
    this.user.getUsuarios().subscribe(
      resp =>{
        this.usuarios = resp;
        console.log(resp);
      },
      err => console.error(err)
    );
  }

  eliminarUsuario(id : string){
    this.user.deleteUsuario(id).subscribe(
      res => {
        console.log(res);
        swal("" ,  "Usuario Eliminado" ,  "success" );
        this.obtenerListado();
      },
      // err => console.error(err),
      swal("Oops" ,  "Error al Eliminar Usuario" ,  "error")
    )
  }

}
