import mongoose from 'mongoose';
import { getEnvVariable } from '../utils/getEnvVariable.js';

export async function initMongoConnection() {
  try {
    const user = getEnvVariable('MONGODB_USER');
    const password = getEnvVariable('MONGODB_PASSWORD');
    const url = getEnvVariable('MONGODB_URL');
    const dbName = getEnvVariable('MONGODB_DB');

    const uri = `mongodb+srv://${user}:${password}@${url}/${dbName}?retryWrites=true&w=majority`;

    await mongoose.connect(uri);

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
}
