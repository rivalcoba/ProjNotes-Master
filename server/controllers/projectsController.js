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
const editPut = async (req, res) => {
  // 1 Extrayendo el parametro id
  const { id } = req.params;
  // 2 Extrayendo la colección del body
  const { name, description } = req.body;
  try {
    // 3 Buscando en la base de datos el documento
    // con ese id
    let projectDocument = await ProjectModel.findOne({ _id: id });
    // 4 El siguiente paso será actualizar el documento localizado
    projectDocument.name = name;
    projectDocument.description = description;
    // 5 Se salva el documento recien actualizado
    projectDocument = await projectDocument.save();
    // 5.1 Se registra en el log el documento recien actualizado
    winston.info(`Proyecto Actualizado: ${JSON.stringify(projectDocument)}`);
    // 6 Se redirecciona al listado de proyectos
    res.redirect('/projects');
  } catch (error) {
    winston.error(`An error was originated: ${error.message}`);
  }
};

// Exportando el Controlador
export default {
  index,
  add,
  edit,
  editPut,
  addPost,
};
