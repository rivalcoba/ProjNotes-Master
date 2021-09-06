// Importando el modelo
import ProjectModel from '@s-models/Project';
// Importando Logger
import winston from '@s-config/winston';

/* GET SECTION */

// GET "projects/"
const index = async (req, res) => {
  // Usando el modelo para ejecutar
  // una consulta a la coleccion proyectos
  const projectsDocs = await ProjectModel.find().lean().exec();
  res.render('projects/ProjectIndex', { projectsDocs });
};
// GET "projects/add"
const add = (req, res) => {
  // Mandando a construir la vista
  // Del formulario para agregar
  // un proyecto
  res.render('projects/add');
};

// GET "/projects/edit/<id>"
// ReF: https://stackoverflow.com/questions/46060721/how-do-you-document-route-params-with-jsdoc
const edit = async (req, res) => {
  const { id } = req.params;
  const project = await ProjectModel.findOne({ _id: id }).lean().exec();
  res.render('projects/ProjectEditForm', project);
};

/* POST SECTION */

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

/* PUT SECTION */

// PUT "/projects/edit/<id>"
const editPut = (req, res) => {
  res.send('PUT EDIT PROJECTS');
};

// Exportando el Controlador
export default {
  index,
  add,
  edit,
  editPut,
  addPost,
};
