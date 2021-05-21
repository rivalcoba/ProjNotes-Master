// Import Router
import { Router } from 'express';
// Import Controller
import projectsController from '@s-controllers/projectsController';

// Creating an instance from the express router
const router = new Router();

// "/" "/home"
router.get(['/', '/index'], projectsController.index);

// "/about"
router.get('/add', projectsController.add);

// Exporting Router
export default router;
