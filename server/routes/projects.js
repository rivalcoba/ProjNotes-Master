// Import Router
import { Router } from 'express';
// Import Controller
import projectsController from '@s-controllers/projectsController';

// Creating an instance from the express router
const router = new Router();

// "/projects" "/projects/index"
router.get(['/', '/index'], projectsController.index);

// "/projects/add"
router.get('/add', projectsController.add);

// POST "/projects/add"
router.post('/add', projectsController.addPost);

// Exporting Router
export default router;
