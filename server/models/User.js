// 1 Importando Mongoose
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import rndString from 'randomstring';
import winston from '@s-config/winston';
import MailSender from '@server/services/mail';
// Importando la URL de la base de datos del sistema
import configKeys from '@server/config/configKeys';
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
UserSchema.post('save', async function sendConfirmationMail() {
  // Creating Mail options
  const options = {
    host: configKeys.smtpHost,
    port: configKeys.smptPort,
    secure: false,
    auth: {
      user: configKeys.mailUsername, // generated ethereal user
      pass: configKeys.mailPassword, // generated ethereal password
    },
  };
  const mailSender = new MailSender(options);
  // Configuring mail data
  mailSender.mail = {
    from: 'jorge.rr@gamadero.tecnm.mx',
    to: this.mail,
    subject: 'Account confirmation',
  };
  try {
    const info = await mailSender.sendMail(
      'confirmation',
      {
        user: this.firstName,
        lastname: this.lastname,
        mail: this.mail,
        token: this.emailConfirmationToken,
        host: configKeys.homeUrl,
      },
      `Estimado ${this.firstName} ${this.lastname} 
      para validar tu cuenta debes hacer clic en el siguiente
      enlace: ${configKeys.homeUrl}/user/confirm/${this.token}`,
    );
    if (!info) return winston.info('😭 No se pudo enviar el correo');
    winston.info('🎉 Correo enviado con exito');
    return info;
  } catch (error) {
    winston.error(`🚨ERROR al enviar correo: ${error.message}`);
    return null;
  }
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
  // Metodo para activar el usuario
  async activate() {
    await this.updateOne({
      emailConfirmationToken: null,
      updatedAt: new Date(),
      emailConfirmedAt: new Date(),
    }).exec();
  },
  // Autentica con el password
  authenticateUser(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

// Agregando métodos estáticos al esquema
UserSchema.statics.findByToken = async function findByToken(token) {
  return this.findOne({ emailConfirmationToken: token });
};

// 4 Se compila el modelo y se exporta
export default mongoose.model('user', UserSchema);
