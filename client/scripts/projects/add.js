// Exportando objeto con scripts de la pagina
const name = document.getElementById('project_name');
const description = document.getElementById('project_description');
const submit = document.getElementById('submit');
// Name function validation
const validationHandler = () => {
  if (name.value === '') {
    name.setCustomValidity('Debe ingresar un nombre de Proyecto');
  } else {
    name.setCustomValidity('');
  }
  if (description.value === '') {
    description.setCustomValidity('Debe ingresar una descripción de Proyecto');
  } else {
    description.setCustomValidity('');
  }
};

export default () => {
  name.addEventListener('input', validationHandler);
  description.addEventListener('input', validationHandler);
  submit.addEventListener('click', validationHandler);
};
