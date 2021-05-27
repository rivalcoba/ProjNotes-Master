// Importando el modelo
// import ProjectModel from '@s-models/Project';

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
const addPost = (req, res) => {
  // Destructuring to get working Objects
  const { validData, errorData } = req;
  let project = {};
  let errorModel = {};
  // Verificando si hay errores
  if (errorData) {
    // Rescatando posible name
    project = errorData.value;
    console.log(`errorData: ${JSON.stringify(errorData)}`);
    console.log(`Proyecto: ${JSON.stringify(project)}`);
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
  project = validData;
  // Regresando el objeto validado
  return res.render('projects/add', { project, errorModel });
};

// Exportando el Controlador
export default {
  index,
  add,
  addPost,
};
