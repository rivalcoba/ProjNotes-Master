import { Router } from 'express';

// Imporntando controlador user
import userController from '../controllers/user.controller';
// Importando el validador
import Validate from '../validators/validate';
// Importamos el esquema de validacion
import userValidator from '../validators/user.validator';

// Creating an instance from the express router
const router = new Router();

// GET user/login
router.get('/login', userController.login);

// GET user/register
router.get('/register', userController.register);

// POST user/register
router.post(
  '/register',
  Validate(userValidator.signUp),
  userController.registerUser,
);

export default router;
