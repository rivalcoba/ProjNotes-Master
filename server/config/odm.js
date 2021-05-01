import mongoose from 'mongoose';
import winston from '@s-config/winston';

class MongooseODM {
  // Creando el constructor de la clase
  constructor(url) {
    this.url = url;
  }

  // Metodos
  async connect() {
    try {
      // Adecuando funcionalidad asincrona en Mongoose
      mongoose.Promise = global.Promise;
      mongoose.set('useNewUrlParser', true);
      mongoose.set('useFindAndModify', false);
      mongoose.set('useCreateIndex', true);
      mongoose.set('useUnifiedTopology', true);
      winston.info(`Conectado DB a: ${this.url}`);
      await mongoose.connect(this.url);
      winston.info(
        'Connection to database engine has successfully established ✅',
      );
      return true;
    } catch (error) {
      winston.error('error: Algo malo ocurrio con la base de datos ❌');
      return false;
    }
  }
}

export default MongooseODM;
