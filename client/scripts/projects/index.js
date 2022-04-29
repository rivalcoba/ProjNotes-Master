// Submit Programatically
export default () => {
  window.submitForm = (id) => {
    const formName = `form${id}`;
    document.forms[formName].submit();
    return false;
  };
};
