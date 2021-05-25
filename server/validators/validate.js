// Usando el patrón Factory para la creación de un middelware de validación
const Validator = ({ shape, getObject }) => async (req, res, next) => {
  // Construyendo el objeto de validación
  const dataObject = getObject(req);
  // El proceso de validación se encierra en un bloque try
  try {
    // Se valida el objeto
    const validData = await shape.validate(dataObject, { abortEarly: false });
    // Se inyecta el objeto validado en la petición
    req.validData = validData;
  } catch (error) {
    // Creando objeto de validación
    req.errorData = error;
  }
  // Se invoca al siguiente middleware de la cadena
  return next();
};
// Exportando validador
export default Validator;
