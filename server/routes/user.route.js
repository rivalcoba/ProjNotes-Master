import { Router } from 'express';
// Imporntando controlador user
import userController from '../controllers/user.controller';
// Importando el validador
import Validate from '../validators/validate';
// Importamos el esquema de validacion
import userValidator from '../validators/user.validator';
import userTokenValidator from '../validators/user.token.validator';
// Importando middleware de autenticación passport
// de estrategia loca
import { authLocal } from '../services/auth.services';

// Creating an instance from the express router
const router = new Router();

// GET user/login
router.get('/login', userController.login);

// POST user/login
router.post('/login', authLocal);

// GET user/register
router.get('/register', userController.register);

// GET user/confirm/<token>
router.get(
  '/confirm/:token',
  Validate(userTokenValidator.token),
  userController.confirm,
);

// POST user/register
router.post(
  '/register',
  Validate(userValidator.signUp),
  userController.registerUser,
);

export default router;
