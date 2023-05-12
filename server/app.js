/* eslint-disable import/no-unresolved */
import createError from 'http-errors';
import express from 'express';
// Override de Verbos de petición
import methodOverride from 'method-override';
import path from 'path';
import cookieParser from 'cookie-parser';
// Importando Passport
import passport from 'passport';
// Importando Winston
import winston from '@s-config/winston';
// Importando Morgan
import morgan from 'morgan';
// Importando enrutador
import router from '@routes/router';
// Import config
import configTemplateEngine from '@s-config/template-engine.js';
// Importando configurador de manejo de sesiones
import configSession from '@s-config/configSession.js';
// Webpack modules
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';

const app = express();

// Webpack middleware
const env = process.env.NODE_ENV || 'development';
// Primero entrara en funcionamiento
if (env === 'development') {
  winston.info('> Executing in Development: Webpack Hot reloading');
  // Agregando la ruta del HMR
  // reload=true:Enable auto reloading when changing JS files or content
  // timeout=1000:Time from disconnecting from server to reconnecting
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];

  // Agregar el plugin a la configuración de desarrollo
  // de webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Creando el compilador
  const compiler = webpack(webpackConfig);

  // Habilitando el middleware en express
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );

  // Habilitando el "Webpack Hot Middleware"
  app.use(webpackHotMiddleware(compiler));
} else {
  winston.info('> Executing in Production');
}

// view engine setup
configTemplateEngine(app);
// Logger Middleware Configuration
app.use(morgan('dev', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Agregando method-override middleware
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Habilitando manejo de sesiones
configSession(app);

// Agrendo middleware de passport
app.use(passport.initialize());
// Agregando el middleware de passport
// para el manejo de sesionres
app.use(passport.session());

// Configurando directorio de archivos estaticos
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
  // Esta servira para passport
  res.locals.user = req.user?.toJSON();
  next();
});

// Agregando rutas
router.addRoutes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  winston.error(
    `404 - ${'Page Not found'} - ${req.originalUrl} - ${req.method} - ${
      req.ip
    }`,
  );
  next(createError(404, 'Page Not found'));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Registrando en winston
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`,
  );

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
