//archivo configuracion de servidor
import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import usuariosRoutes from './routes/usuariosRoutes';

class Server {

    public app: Application;
    constructor() {
      this.app = express();
      this.config();
      this.routes();
    }

    //configuracion del server
  config(): void{
    this.app.set('port', process.env.PORT || 4000);
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false}));
  }

  //definicion de rutas
  routes(): void{
    this.app.use('/', indexRoutes);
    this.app.use('/api/usuarios', usuariosRoutes);
  }

  //arrancar servidor
  start(): void{
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server on Port`, this.app.get('port'));
    });
  }
}

const server = new Server();
server.start(); 