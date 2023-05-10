// Importando manejo de sesiones
import ExpressSession from 'express-session';
// Importando soporte para mensajes flash
import ConnectFlash from 'connect-flash';
// Importando soporte para almacenado de sesiones
import MongoStore from 'connect-mongo';
// Importando la URL de la base de datos del sistema
import configKeys from '@server/config/configKeys';

// Creando options object para el manejador de sesiones
const options = {
  secret: 'awesome',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: configKeys.databaseUrl,
    ttl: 1 * 24 * 60 * 60, // Salva la sesión por 1 día
  }),
};

export default (app) => {
  // Creando el middleware
  const sessionMiddleware = ExpressSession(options);
  app.use(sessionMiddleware);
  // Agregando el middleware para mensajes flash
  app.use(ConnectFlash());
  // Obteniendo los mensajes de flash y guardandolos en variables locales
  // a la petición
  app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    res.locals.infoMessage = req.flash('infoMessage');
    // Esta servira para passport
    res.locals.passportError = req.flash('error');
    console.log(`🌟 ${res.locals.passportError} 🌟`);
    next();
  });
  // Retornando la aplicación
  return app;
};
