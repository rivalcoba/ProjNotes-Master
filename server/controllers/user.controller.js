// Importando Logger
import winston from '@s-config/winston';

const login = (req, res) => {
  winston.info('Se manda a generar vista "user/login"');
  res.render('user/login');
};

const register = (req, res) => {
  winston.info('Se manda a generar vista "user/register"');
  res.send('Register Page');
};

export default { login, register };
