// Importando biblioteca de validación
import * as Yup from 'yup';
// All we need from the confirmation email is the token
const tokenSchema = Yup.object().shape({
  token: Yup.string().length(64).required(),
});

const tokenGetter = (req) => {
  // Desestructuramos la informacion
  const { token } = req.params;
  // Se regresa el objeto signup
  return {
    token,
  };
};

const token = { shape: tokenSchema, getObject: tokenGetter };

export default { token };
