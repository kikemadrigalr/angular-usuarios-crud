import { Injectable } from '@angular/core';

//modulo para manejar las peticiones http desde angular
import { HttpClient } from "@angular/common/http";

//importar tipo de dato USER
import { User } from "../models/usuario"

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  //url donde se encuentra el api
  API_URI = 'http://localhost:4000/api'

  constructor(private http : HttpClient) { }

  //metodos para peticiones a api en servidor http

  //retornar lista de usuarios
  getUsuarios(){
    return this.http.get(`${this.API_URI}/usuarios`);
  }

  //obtener un usuario
  getUsuario(id : string){
    return this.http.get(`${this.API_URI}/usuarios/${id}`);
  }

  getCedulaUsuario(cedula : string|number){
    return this.http.get(`${this.API_URI}/usuarios/${cedula}`);
  }

  // guardar un usuario
  saveUsuario(usuario : User){
    return this.http.post(`${this.API_URI}/usuarios`, usuario);
  }

  //modificar usuario
  updateUsuario(id : string|number, updatedUsuario : User){
    return this.http.put(`${this.API_URI}/usuarios/${id}`, updatedUsuario);
  }

  //eliminar usuario
  deleteUsuario(id : string){
    return this.http.delete(`${this.API_URI}/usuarios/${id}`);
  }
};
