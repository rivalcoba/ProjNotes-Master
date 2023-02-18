// Importando Logger
import winston from '@s-config/winston';
// Importando el modelo usuario
import User from '../models/User';

// GET user/login
const login = (req, res) => {
  winston.info('Se manda a generar vista "user/login"');
  res.render('user/login');
};

// GET user/register
const register = (req, res) => {
  winston.info('Se manda a generar vista "user/register"');
  res.render('user/register');
};

// GET user/confirm/<token>
const confirm = (req, res) => {
  // Extrayendo datos de validación
  const { validData, errorData } = req;
  if (errorData) return res.json(errorData);
  const { token } = validData;
  return res.send(`Token valido: ${token}`);
};

// POST user/register
const registerUser = async (req, res) => {
  // Extrayendo datos de validación
  const { validData, errorData } = req;
  // Verificando si hay errores
  if (errorData) {
    // Respondemos el objeto de error
    return res.json(errorData);
  }
  // Se crea al usuario
  // con los datos provistos por el formulario
  try {
    // Se extraen datos validados
    // del usuario
    const { firstName, lastname, mail, password } = validData;
    // 1. Se crea un documento
    // mediante el método "create" del modelo "User"
    const user = await User.create({
      firstName,
      lastname,
      mail,
      password,
    });
    // Se realiza una conversión a Json
    // del objeto
    const viewModel = user.toJSON();
    winston.info('Se manda a generar vista "user/registrationSuccessful"');
    // Retornado el objeto usuario
    return res.render('user/registrationSuccessful', {
      ...viewModel,
      backgroundColor: 'cyan darken-2',
    });
  } catch (error) {
    return res.json(error);
  }
};

export default {
  login,
  register,
  registerUser,
  confirm,
};
