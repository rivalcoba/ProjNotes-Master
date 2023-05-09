// Importando estrategia
import LocalStrategy from 'passport-local';

// Importando el modelo de usuarios
import User from '../models/User';

// Creando objeto de configuraciones
const localOptions = {
  usernameField: 'mail',
};

export default function(passport){
  // Creando la instancia de la estrategia local
  const localStrategy = new LocalStrategy(
    localOptions,
    (mail, password, done) => {
      if(password === "123123"){
        return done(null, {mail: "hola", "password": "123123", "id": "123123123"});
      }
      else{
        return done(null, false, { message: 'Usuario o password incorrecto' });
      }
    },
  );

  // Se registra la estrategia
  passport.use(localStrategy);

  // Esto genera y mantiene las cookies
  passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
  done(null, {mail: "hola", "password": "123123", "id": "123123123"});
});

  return passport;
}