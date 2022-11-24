// 1 Importando Mongoose
import mongoose from 'mongoose';
// 2 Destructuruzado el Schema
const { Schema } = mongoose;
// 3 Creando el Schema
const UserSchema = new Schema();
// 4 Se compila el modelo y se exporta
export default mongoose.model('user', UserSchema);
