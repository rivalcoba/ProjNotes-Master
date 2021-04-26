/* eslint-disable no-console */
import './stylesheets/style.css';

/* Inicialización de scrips para Materilize Css */
document.addEventListener('DOMContentLoaded', () => {
  const sideNav = document.querySelectorAll('.sidenav');
  // eslint-disable-next-line no-undef
  M.Sidenav.init(sideNav);
});
