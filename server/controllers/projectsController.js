// Importando el modelo
import ProjectModel from '@s-models/Project';

// "projects/"
const index = (req, res) => {
  res.send('Listando Proyectos');
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
    // return res.render('projects/add', { project, errorModel });
  } else {
    // Creando un documento con los datos provistos
    // del formulario
    let projectModel = new ProjectModel(validData);
    try {
      // Salvando el documento, dado que la operación
      // salvar es una función asincrona
      // puede ser manejada mediante un callback
      // o mediante un async
      projectModel = await projectModel.save();
    } catch (error) {
      return res.status(404).json({ error });
    }

    return res.json(projectModel);

    project = validData;
  }
  // Regresando el objeto validado
  return res.render('projects/add', { project, errorModel });
};

// Exportando el Controlador
export default {
  index,
  add,
  addPost,
};
