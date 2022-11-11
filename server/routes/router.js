// Iportando la ruta de home
import home from '@routes/home';
import projects from '@routes/projects';
import user from './user.route';

const addRoutes = (app) => {
  /* home routes */
  app.use('/', home);

  /* projects routes */
  app.use('/projects', projects);

  /* user route */
  app.use('/user', user);
};

export default {
  addRoutes,
};
