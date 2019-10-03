import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/usuario';
import { UsuariosService } from "../../services/usuarios.service";


@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {
  usuario : User = {
    id : 0,
    nombres : "",
    apellidos : "",
    cedula : "",
    correo : "",
    telefono : "",
    created_at : new Date()
  }
  constructor(private us : UsuariosService) { }

  ngOnInit() {
  }

  guardarNuevoUsuario(){
    delete this.usuario.id;
    delete this.usuario.created_at;
    this.us.saveUsuario(this.usuario).subscribe(
      res => {
        console.log(res);
        console.log(this.usuario);
      },
      err => console.error(err)
    );
  }

}
