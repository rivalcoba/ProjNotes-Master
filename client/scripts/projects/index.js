// Referencias
const deleteAchor = document.getElementById('deleteAnchor');

// Manejadores
const deleteProject = () => {
  console.log('Se manda a borrar proyecto');
  return false;
};

export default () => {
  deleteAchor.addEventListener('click', deleteProject);
};
