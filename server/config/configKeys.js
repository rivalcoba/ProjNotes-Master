// Importando el paquete Dotnev
import dotenv from 'dotenv';

// Cargando las variables de entorno
// En caso de no estar presente el archivo ".env"
// el modulo fallara de manera silenciosa
dotenv.config();

// Creando el objeto que contendra
// los datos de configuración
export default {
  homeUrl: `${process.env.APP_URL}:${process.env.PORT}`,
  port: process.env.PORT,
  ip: process.env.IP,
};
