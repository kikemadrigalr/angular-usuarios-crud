//definir Enrutador para usuarios

import { Router } from 'express';
import usuariosController from '../controllers/usuariosController';

class UsuariosRoutes {
    public router: Router = Router();
  
    constructor() {
      this.config();
    }
  
    config(): void {
      //ruta para listar un usuario desde la Api - BD
      this.router.get('/', usuariosController.list);
        
      //ruta para leer un usuario recibiendo su id
      this.router.get("/:id", usuariosController.getOne);

      this.router.get("/:cedula", usuariosController.getOneCedula);
  
      //ruta para agregar un usuario 
      this.router.post("/", usuariosController.create);
  
      //ruta para actualizar un usuario
      this.router.put("/:id", usuariosController.update);
  
      //eliminar usuaior
      this.router.delete("/:id", usuariosController.delete);
    }
  }
  
  const usuarioRoutes = new UsuariosRoutes();
  export default usuarioRoutes.router;