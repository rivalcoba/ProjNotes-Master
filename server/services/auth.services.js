// Importando Passport
import passport from 'passport';

// Se exporta el middleware
// Como primer argumento es el nombre de la estrategia
// el Segundo argumento son las opciones
export const authLocal = passport.authenticate('local', {
  // Redireccionamiento en caso de fallo
  successRedirect: '/projects',
  // Redireccionamiento en caso de exito
  failureRedirect: '/user/login',
  // Permite el uso de mensajes de flash
  // si falla la autenticacion
  failureFlash: true,
});

export const authJwt = {};
