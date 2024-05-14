import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ropa__route"
});

export function conectar(){
  connection.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos: ", err);
      return;
    }
    console.log('conectado :)');
  });
}
export function desconectar(){
  connection.end((err) => {
    if (err) {
      console.error("Error al cerrar la conexión a la base de datos:", err.message);
      return;
    }
    console.log('Conexión cerrada correctamente');
  });
}

//module.exports={conectar, desconectar,connection};