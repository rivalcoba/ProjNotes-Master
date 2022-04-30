// Importando manejo de sesiones
import expressSession from 'express-session';
// Importando soporte para mensajes flash
import connectFlash from 'connect-flash';
// Importando soporte para almacenado de sesiones
import connectMongo from 'connect-mongo';

// Obteniendo el modo de ejecución
const env = process.env.NODE_ENV || 'development';
// Creando options object para el manejador de sesiones
const options = {
  secret: 'awesome',
  // TODO: Crear objeto de opciones
};

export default (app) => {
  if (env === 'development') {
    // En modo desarrollo
  } else {
    // En modo producción
  }
  return app;
};
