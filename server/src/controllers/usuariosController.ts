//clase usuarios con metodos para crear, leer, modificar, eliminar, listar
import { Request, Response } from 'express';
import pool from '../database';

class UsuariosController {

    //listar todos los usuarios
    public async list(req : Request, res : Response) {
      
        await pool.query('SELECT * FROM usuarios', function(err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
     
    }
  
    //obtener un usuario segun su id
    public async getOne(req : Request, res : Response) : Promise<any>{
      
      const { id } = req.params;

       await pool.query('SELECT * FROM usuarios WHERE id = ?', [id], function(err, result, fields) {
        if (err) throw err;
          console.log(result);
          res.json(result);
       });
    }
  
    //metodo create - crear un usuario
    public async create(req : Request, res : Response)  : Promise<void>{

      await pool.query('INSERT INTO usuarios set ?', [req.body]);
      res.json({ "Mensaje" : "Nuevo Usuario Guardado"});
    }
  
    //actualizar Usuario
    public async update(req :Request, res : Response) : Promise<void>{
     const { id } = req.params;

      await pool.query("UPDATE usuarios SET ? WHERE id = ? ", [req.body, id]);
      res.json({"Mensaje" : "Usuario Actualizado"})
    }
  
    //metodo delete para eliminar usuario
    public async delete(req : Request, res : Response) : Promise<void>{
      const { id } = req.params;

      await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
      res.json({"Mensaje" : "Usuario ELiminado"});
    }
  }
  
const usuariosController = new UsuariosController();

export default usuariosController;
  