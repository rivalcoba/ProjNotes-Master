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
      const m = await mongoose.connect(this.url);
      return m.connection.getClient();
    } catch (error) {
      return false;
    }
  }
}

export default MongooseODM;
