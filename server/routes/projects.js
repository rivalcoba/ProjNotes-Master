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

/* GET SECTION */

// "/projects" "/projects/index"
router.get(['/', '/index'], projectsController.index);

// "/projects/add"
router.get('/add', projectsController.add);

// "/projects/edit/<id>"
router.get('/edit/:id', projectsController.edit);

/* POST SECTION */

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

/* PUT SECTION */

// PUT "/projects/edit/<id>"
router.put('/edit/:id', projectsController.editPut);

/* DELETE SECTION */
router.delete('/delete/:id', projectsController.deleteProject);

// Exporting Router
export default router;
