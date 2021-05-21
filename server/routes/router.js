// Iportando la ruta de home
import home from '@routes/home';
import projects from '@routes/projects';

const addRoutes = (app) => {
  /* home routes */
  app.use('/', home);

  /* projects routes */
  app.use('/projects', projects);
};

export default {
  addRoutes,
};
