/* eslint-disable import/no-unresolved */
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
// Importando Winston
import winston from '@s-config/winston';
// Importando Morgan
import morgan from 'morgan';
import indexRouter from '@routes/index';
import usersRouter from '@routes/users';
// Import config
import configTemplateEngine from '@s-config/template-engine.js'
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
  console.log('> Executing in Development: Webpack Hot reloading');
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
  console.log('> Executing in Production');
}

// view engine setup
configTemplateEngine(app);
// Logger Middleware Configuration
app.use(morgan('dev',{stream : winston.stream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  winston.error(`404 - ${"Page Not found"} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  next(createError(404,"Page Not found"));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Registrando en winston
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
