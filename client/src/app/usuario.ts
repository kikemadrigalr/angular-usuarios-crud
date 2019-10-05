export class Usuario {

    constructor(
      public id: number,
      public nombres: string,
      public apellidos: string,
      public cedula: string,
      public correo: string,
      public telefono: string,
      public created_at: Date

    ) {  }
  
  }