// Importando Passport
import passport from 'passport';

// Importando estrategia
import LocalStrategy from 'passport-local';

// Importando el modelo de usuarios
import User from '../models/User';

// Creando objeto de configuraciones
const localOptions = {
  usernameField: 'mail',
};

// Creando la instancia de la estrategia local
const localStrategy = new LocalStrategy(
  localOptions,
  async (mail, password, done) => {
    try {
      // Buscando al usuario en la base de datos
      const user = await User.findOne({ mail });
      // En caso de no encontrar al usuario se regresa falso
      if (!user) {
        return done(null, false, { message: 'Usuario no registrado' });
      }
      // En caso de que no este confirmado el usuario
      // falla la autenticación
      if (!user.emailConfirmedAt) {
        return done(
          null, // error
          false, // user
          {
            message:
              'Cuenta inactiva, favor de activarla haciendo clic en el enlace previamente enviado a su correo.',
          },
        );
      }
      // En caso de no proveer el password correcto se regresa falso
      // Para ello se usa un método
      if (!user.authenticateUser(password)) {
        return done(null, true, { message: 'Password o usuario incorrecto' });
      }
      // En caso de pasar las anteriores pruebas
      // se regresa el usuario y un valor de verdadero
      // que indica que se ha pasado la autenticación
      return done(user, true);
    } catch (error) {
      return done(error, false);
    }
  },
);

// Se registra la estrategia
passport.use(localStrategy);

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
