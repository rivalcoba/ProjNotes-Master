// Import Router
import { Router } from 'express'
// Import Controller
import homeController from "@s-controllers/homeController";

// Creating an instance from the express router
const router = new Router();

// "/" "/home"
router.get(['/','/home'], homeController.index);

// "/about"
router.get('/about', homeController.about);

// Exporting Router
export default router;
