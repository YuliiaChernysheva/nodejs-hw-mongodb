import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVariable } from './utils/getEnvVariable.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import Router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export function setupServer() {
  const PORT = Number(getEnvVariable('PORT', '3000'));
  const app = express();

  app.use(express.json());

  app.use(cors());
  app.use(pino());
  app.use(cookieParser());

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(Router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
