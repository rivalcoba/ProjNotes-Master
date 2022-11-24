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
    return res.json({
      validData,
      errorData,
    });
  } catch (error) {
    return res.json(error);
  }
};

export default { login, register, registerUser };
