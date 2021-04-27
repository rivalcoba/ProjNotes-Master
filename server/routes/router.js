// Iportando la ruta de hombe
import home from '@routes/home';

const addRoutes = (app) => {
  /* GET home page. */
  app.use('/', home);
};

export default {
  addRoutes,
};
