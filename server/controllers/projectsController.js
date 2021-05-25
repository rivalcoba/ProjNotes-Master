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
  const { validData: project, errorData } = req;
  let errorModel = {};
  // Verificando si hay errores
  if (errorData) {
    // Constructing error object
    // const errorObject = {};
    // Using Reduce
    errorModel = errorData.inner.reduce((prevVal, currVal) => {
      // Se crea una variable temporar para evitar el error
      // "no-param-reassign"
      const newVal = prevVal;
      newVal[`${currVal.path}Error`] = currVal.message;
      return newVal;
    }, {});
  }
  // Regresando el objeto validado
  res.status(200).json({ project, errorModel });
};

// Exportando el Controlador
export default {
  index,
  add,
  addPost,
};
