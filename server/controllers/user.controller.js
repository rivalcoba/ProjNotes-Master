// Importando Logger
import winston from '@s-config/winston';

const login = (req, res) => {
  winston.info('Se manda a generar vista "user/login"');
  res.render('user/login');
};
// GET user/register
const register = (req, res) => {
  winston.info('Se manda a generar vista "user/register"');
  res.render('user/register');
};
// POST user/register
const registerUser = (req, res) => {
  res.send(req.body);
};

export default { login, register, registerUser };
