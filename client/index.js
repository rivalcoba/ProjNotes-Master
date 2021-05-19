/* eslint-disable no-console */
import './stylesheets/style.css';

/* Inicialización de scrips para Materilize Css */
document.addEventListener('DOMContentLoaded', () => {
  const sideNavs = document.querySelectorAll('.sidenav');
  for (let i = 0; i < sideNavs.length; i += 1) {
    // eslint-disable-next-line no-undef
    M.Sidenav.init(sideNavs[i]);
  }
  // Inicializando el dropdown
  const dropdowns = document.querySelectorAll('.dropdown-trigger');
  for (let i = 0; i < dropdowns.length; i += 1) {
    // eslint-disable-next-line no-undef
    M.Dropdown.init(dropdowns[i]);
  }
});
