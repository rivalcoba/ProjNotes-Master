import { Router } from 'express';

// Imporntando controlador user
import userController from '../controllers/user.controller';

// Creating an instance from the express router
const router = new Router();

// GET user/login
router.get('/login', userController.login);

// GET user/register
router.get('/register', userController.register);

export default router;
