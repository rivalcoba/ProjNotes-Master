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
  const { projectName, projectDescription } = req.body;
  res.status(200).json({
    projectName,
    projectDescription,
  });
};

// Exportando el Controlador
export default {
  index,
  add,
  addPost,
};
