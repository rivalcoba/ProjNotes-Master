// Referencias
const deleteAchor = document.getElementById('deleteAnchor');

// Manejadores
const deleteProject = () => {
  console.log('Se manda a borrar proyecto');
  document.forms.deleteProjectForm.submit();
  return false;
};

export default () => {
  deleteAchor.addEventListener('click', deleteProject);
};
