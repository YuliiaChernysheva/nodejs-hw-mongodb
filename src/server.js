import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVariable } from './utils/getEnvVariable.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import Router from './routers/index.js';
import cookieParser from 'cookie-parser';

export function setupServer() {
  const PORT = Number(getEnvVariable('PORT', '3000'));
  const app = express();

  app.use(express.json());

  app.use(cors());
  app.use(pino());
  app.use(cookieParser());

  app.use(Router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
