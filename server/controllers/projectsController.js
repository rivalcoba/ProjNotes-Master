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
const addPost = (req, res) => {
  // Destructuring
  const { validData: project } = req;
  // Regresando el objeto validado
  res.status(200).json(project);
};

// Exportando el Controlador
export default {
  index,
  add,
  addPost,
};
