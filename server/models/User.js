// 1 Importando Mongoose
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import rndString from 'randomstring';
// 2 Destructuruzado el Schema
const { Schema } = mongoose;
// const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
// 3 Creando el Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  mail: {
    type: String,
    unique: true,
    required: [true, 'Es necesario ingresar un E-mail'],
    trim: true,
    validate: {
      validator(mail) {
        return validator.isEmail(mail);
      },
      message: '{VALUE} no es un E-mail valido!',
    },
  },
  password: {
    type: String,
    required: [true, 'Es necesario ingresar una contraseña'],
    trim: true,
    minlength: [6, 'Necesitas ingresar un password con mas caracteres'],
  },
  image: {
    type: String,
    default: 'https://img.icons8.com/fluent/48/000000/user-male-circle.png',
  },
  emailConfirmationToken: String,
  createdAt: Date,
  updatedAt: Date,
  emailConfirmedAt: Date,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// HOOKS
UserSchema.pre('save', function presave(next) {
  // Verificando si se ha modificado el password
  // En el momento de salvar el documento
  if (this.isModified('password')) {
    // Encriptando el password
    this.password = this.hashPassword(this.password);
  }
  // Grabando fechas
  this.emailConfirmationToken = this.generateConfirmationToken();
  this.createdAt = new Date();
  this.updatedAt = new Date();
  return next();
});

// Agregando metodos al esquema
UserSchema.methods = {
  // Metodo para encriptar el password
  hashPassword(password) {
    return bcrypt.hashSync(password);
  },
  // Metodo para generar token de autenticacion
  generateConfirmationToken() {
    return rndString.generate(64);
  },
};

// 4 Se compila el modelo y se exporta
export default mongoose.model('user', UserSchema);
