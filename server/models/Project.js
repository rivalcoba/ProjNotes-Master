// 1 Importando Mongoose
import mongoose from 'mongoose';

// 2 Destructuruzado el Schema
const { Schema } = mongoose;

// 3 Creando el Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// 4 Se compila el modelo y se exporta
export default mongoose.model('project', ProjectSchema);
