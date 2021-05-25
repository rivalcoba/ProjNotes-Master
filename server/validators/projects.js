// Importando biblioteca de validación
import * as Yup from 'yup';

// Creando el esquema de validación
const projectSchema = Yup.object().shape({
  name: Yup.string().required('Se requiere un nombre'),
  description: Yup.string()
    .max(500, 'La descripción esta limitada a 500 Caracteres')
    .required('Se requiere una descripción'),
});

const getProject = (req) => {
  // Extracting Object from request
  const { name, description } = req.body;
  // returning Object
  return {
    name,
    description,
  };
};

export default {
  projectSchema,
  getProject,
};
