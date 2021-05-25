// Import Router
import { Router } from 'express';
// Import Controller
import projectsController from '@s-controllers/projectsController';
// Import validator
import Validate from '@server/validators/validate';
// Import validator schema
import projectValidator from '@server/validators/projects';

// Creating an instance from the express router
const router = new Router();

// "/projects" "/projects/index"
router.get(['/', '/index'], projectsController.index);

// "/projects/add"
router.get('/add', projectsController.add);

// POST "/projects/add"
// Se realiza validación
router.post(
  '/add',
  Validate({
    shape: projectValidator.projectSchema,
    getObject: projectValidator.getProject,
  }),
  projectsController.addPost,
);

// Exporting Router
export default router;
