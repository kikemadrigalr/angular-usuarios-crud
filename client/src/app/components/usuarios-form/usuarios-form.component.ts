import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/usuario';
import { UsuariosService } from "../../services/usuarios.service";
import { ActivatedRoute, Router } from "@angular/router";


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
    titulo : string = 'NUEVO USUARIO';
   tituloActualizar : string = 'ACTUALIZAR USUARIO'; 

  edit : Boolean = false;

  constructor(private us : UsuariosService, private router : Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;

    if(params.id){
      this.us.getUsuario(params.id).subscribe(
        res => {
          this.edit = true;
          this.titulo = this.tituloActualizar;
          console.log(res);
          this.usuario = res[0];
         
        },
        err => console.error(err)
      )
    }
  }

  guardarNuevoUsuario(){
    delete this.usuario.id;
    delete this.usuario.created_at;

    this.us.saveUsuario(this.usuario).subscribe(
      res => {
        console.log(res);
        console.log(this.usuario);
        this.titulo;
        
        swal("Éxito" ,  "Usuario Guardado" ,  "success" );
        this.router.navigate(['/usuarios'])
      },
      err => console.error(err)
    );
  }

  editarUsuario(){
    delete this.usuario.created_at;

    this.us.updateUsuario(this.usuario.id, this.usuario).subscribe(
      res => {
        console.log(res)
        swal("" ,  "Usuario Actualizado" ,  "success" );
        this.router.navigate(['/usuarios'])
      },
      err => console.error(err)
    )
  }

}
