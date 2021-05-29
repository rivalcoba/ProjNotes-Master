// Importando el modelo
import ProjectModel from '@s-models/Project';
// Importando Logger
import winston from '@s-config/winston';

// GET "projects/"
const index = async (req, res) => {
  // Usando el modelo para ejecutar
  // una consulta a la coleccion proyectos
  const projectsDocs = await ProjectModel.find().lean().exec();
  res.render('projects/index', { projectsDocs });
};
// "projects/add"
const add = (req, res) => {
  // Mandando a construir la vista
  // Del formulario para agregar
  // un proyecto
  res.render('projects/add');
};
// POST "projects/add"
const addPost = async (req, res) => {
  // Destructuring to get working Objects
  const { validData, errorData } = req;
  let project = {};
  let errorModel = {};
  // Verificando si hay errores
  if (errorData) {
    // Rescatando posible name
    project = errorData.value;
    // Using Reduce for Constructing the errorModel
    errorModel = errorData.inner.reduce((prevVal, currVal) => {
      // Se crea una variable temporal para evitar el error
      // "no-param-reassign"
      const newVal = prevVal;
      newVal[`${currVal.path}Error`] = currVal.message;
      return newVal;
    }, {});
    return res.render('projects/add', { project, errorModel });
  }
  // Creando un documento con los datos provistos
  // del formulario
  try {
    const projectDoc = await ProjectModel.create(validData);
    winston.info(`Projecto Creado: ${JSON.stringify(projectDoc)}`);
    // Redireccionado
    return res.redirect('/projects');
  } catch (error) {
    return res.status(404).json({ error });
  }
};

// Exportando el Controlador
export default {
  index,
  add,
  addPost,
};
