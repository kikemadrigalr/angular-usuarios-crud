import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, ValidationErrors, FormsModule } from "@angular/forms"
import { User } from 'src/app/models/usuario';
import { UsuariosService } from "../../services/usuarios.service";
import { ActivatedRoute, Router } from "@angular/router";
// import { Usuario } from "../../usuario"


@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})

export class UsuariosFormComponent implements OnInit {

  usuario: User = {
    id: 0,
    nombres: "",
    apellidos: "",
    cedula: "",
    correo: "",
    telefono: "",
    created_at: new Date()
  }
  titulo: string = 'NUEVO USUARIO';
  tituloActualizar: string = 'ACTUALIZAR USUARIO';

  edit: Boolean = false;
  usuarios: any = [];

  constructor(private us: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;

    if (params.id) {
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

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  validarEmail(email: string) {
    const formato = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    if (formato.test(email)) {
      //("La dirección de email es correcta.");
      return true;
    } else {
      //("La dirección de email es incorrecta.");
      return false;
    }
  }


  guardarNuevoUsuario() {

    delete this.usuario.id;
    delete this.usuario.created_at;

    if ((this.usuario.nombres === "") || (this.usuario.apellidos === "") || (this.usuario.cedula === "") || (this.usuario.correo === "") || (this.usuario.telefono === "")) {
      swal("Error", "Complete el Formulario", "error");
    }
    else {
      const cedulaExiste: boolean = this.comprobarCedula(this.usuario.cedula);
      const correoValido: boolean = this.validarEmail(this.usuario.correo);
      const correoExiste: boolean = this.comprobarCorreo(this.usuario.correo);

      if (cedulaExiste === true) {
        swal("", "La cedula Se encuentra Registrada", "warning")
      }
      else {
        if (correoValido == true) {
          if (correoExiste == true) {
            swal("", "El correo encuentra Registrado", "warning")
          }
          else {
            this.us.saveUsuario(this.usuario).subscribe(
              res => {
                console.log(res);
                console.log(this.usuario);

                swal("Éxito", "Usuario Guardado", "success")
                this.router.navigate(['/usuarios'])
              },
              err => console.error(err),
              swal("Oops", "Error al Guardar Usuario", "error")
            );
          }
        }
        else {
          swal("Cuidado", "Direccion de email Invalida", "warning")
        }
      }
    }
  }

  editarUsuario() {
    delete this.usuario.created_at;
    if ((this.usuario.nombres === "") || (this.usuario.apellidos === "") || (this.usuario.cedula === "") || (this.usuario.correo === "") || (this.usuario.telefono === "")) {
      swal("Error", "Complete el Formulario", "error");
    }
    else {
      const correoValido: boolean = this.validarEmail(this.usuario.correo);

      if (correoValido == true) {
        this.us.updateUsuario(this.usuario.id, this.usuario).subscribe(
          res => {
            console.log(res)
            swal("", "Usuario Actualizado", "success")
            this.router.navigate(['/usuarios'])
          },
          err => console.error(err),
          swal("Oops", "Error al Actualizar Usuario", "error")
        )
      }
      else {
      swal("Cuidado", "Direccion de email Invalida", "warning")
      }
    }
}

  obtenerListado() {
    this.us.getUsuarios().subscribe(
      resp => {
        this.usuarios = resp;
        console.log(resp);
      },
      err => console.error(err)
    );
  }

  comprobarCedula(cedula: string | number) {
    for (let i = 0; i < Object.keys(this.usuarios).length; i++) {
      console.log(this.usuarios[i]);
      if (this.usuarios[i].cedula === cedula) {
        //  alert('cedula existe')
        return true;
      }
      else {
        //correo no existe
        false
      }
    }
  }

  comprobarCorreo(correo: string) {
    for (let i = 0; i < Object.keys(this.usuarios).length; i++) {
      if (this.usuarios[i].correo === correo) {
        //  ('correo existe')
        return true;
      }
      else {
        //correo no existe
        false
      }
    }
  }
}
