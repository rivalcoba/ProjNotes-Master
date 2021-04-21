// Importando la clase Router
import { Router } from 'express';
// Iportando la ruta de hombe
import home from '@routes/home'
// Creando una instancia del enrutador
const router = new Router();

const addRoutes = (app)=>{
  /* GET home page. */
  app.use('/', home);
}

export default {
  addRoutes
}
