// Import Router
import { Router } from 'express'
// Import Controller
import homeController from "@s-controllers/homeController";

// Creating an instance from the express router
const router = new Router();

// "/"
router.get('/', homeController.index);

// Exporting Router
export default router;
