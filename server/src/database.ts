//conexion a Base de Datos
import mysql from 'mysql';
import keys from "./keys";

const pool = mysql.createPool(keys.database);


pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          //no se establecio la conexion
          console.error('La Conexión ha sido cerrada');
        }
    
        if (err.code === 'ER_CON_COUNT_ERROR') {
          //cuantas conexiones tiene la base de datos
          console.error('La base de datos tiene mas de una conexión')
        }
    
        if (err.code === 'ECONNREFUSED') {
          //la conexion ha sido rechazada
          console.error('La conexión a la base de datos fue rechazada')
        }
      }

      if(connection){
        connection.release();
        console.log('Se establecio la conexion a BD Usuarios');
        return;
      }
});

export default pool;