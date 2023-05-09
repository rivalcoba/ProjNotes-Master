// Importando Logger
import winston from '@s-config/winston';
// Importando el modelo usuario
import User from '../models/User';

// GET user/login
const login = (req, res) => {
  winston.info('Se manda a generar vista "user/login"');
  res.render('user/login');
};

// POST user/logout
const logout = (req, res) => {
  // Passport incrusta en la petición el 
  // método logout
  req.logout();
  // Creamos mensaje de flash
  req.flash('success_msg', 'Ha cerrado sesión correctamente');
  // Redireccionamos al login
  res.redirect('/user/login');
};

// GET user/register
const register = (req, res) => {
  winston.info('Se manda a generar vista "user/register"');
  res.render('user/register');
};

// GET user/confirm/<token>
const confirm = async (req, res) => {
  // Extrayendo datos de validación
  const { validData, errorData } = req;
  if (errorData) return res.json(errorData);
  const { token } = validData;
  // Buscando si existe un usuario con ese token
  const user = await User.findByToken(token);
  if (!user) {
    return res.send('USER WITH TOKEN NOT FOUND');
  }
  // Activate user
  await user.activate();
  return res.send(`Usuario: ${user.firstName} Validado`);
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
  logout,
  register,
  registerUser,
  confirm,
};
