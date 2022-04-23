import winston, { format } from 'winston';
// Se extraen componentes para crear formato personalizado
// const { combine, timestamp, label, printf } = winston.format;
import appRoot from 'app-root-path';

// COLORS
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'green',
};

winston.addColors(colors);

// Creando formato personalizado para la consola
const myFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const myFileFormat = format.combine(
  format.uncolorize(),
  format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  format.json(),
);

// Creando configuraciones
const options = {
  infoFile: {
    level: 'info',
    filename: `${appRoot}/server/logs/infos.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  warnFile: {
    level: 'warn',
    filename: `${appRoot}/server/logs/warns.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  errorFile: {
    level: 'error',
    filename: `${appRoot}/server/logs/errors.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myFormat,
  },
};

// Creamos una instanacia del logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.infoFile),
    new winston.transports.File(options.warnFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // no finaliza en excepciones manejadas
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

export default logger;
