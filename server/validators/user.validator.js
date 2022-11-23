// Importando biblioteca de validación
import * as Yup from 'yup';

// Strong password Regex
// Reglas del password en Regex
// const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

// Creando el esquema de validación
const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Se requiere ingresar nombre'),
  lastName: Yup.string().required('Se requiere ingresar apellido'),
  email: Yup.string().email().required('Se requiere ingresar un correo valido'),
  password: Yup.string()
    .min(6)
    .required('Se requiere ingresar password de al menos 6 caracteres'),
  confirmationPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Los passwords ingresados no coinciden',
  ),
});

const signUpGetter = (req) => {
  // Desestructuramos la informacion
  const { firstName, lastname, mail, password, cpassword } = req.body;
  // Se regresa el objeto signup
  return {
    firstName,
    lastname,
    mail,
    password,
    cpassword,
  };
};

const signUp = { shape: signUpSchema, getObject: signUpGetter };

export default { signUp };
