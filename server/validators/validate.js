// Importando biblioteca de validación
import * as Yup from 'yup';

const Validator = ({ shape, getObject }) => async (req, res, next) => {
  // Construyendo el esquema
  // const schema = Yup.object().shape(shape);
  // Construyendo el objeto de validación
  const dataObject = getObject(req);
  // El proceso de validación se encierra en un bloque try
  try {
    // Se valida el objeto
    const validData = await shape.validate(dataObject);
    console.log(`Valid DATA: ${validData}`);
    // Se inyecta el objeto validado en la petición
    req.validData = validData;
    // Se invoca al siguiente middleware en la cadena
    return next();
  } catch (error) {
    // En caso de error se regresa información de error
    console.log("ERROR EN VALIDACION");
    return res.status(400).json({ error: error.message });
  }
};
// Exportando validador
export default Validator;
