import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import dotenv from 'dotenv';

dotenv.config();

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
