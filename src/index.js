// import 'dotenv/config';
// import { setupServer } from './server.js';
// import { initMongoConnection } from './db/initMongoConnection.js';

// async function bootstrap() {
//   try {
//     await initMongoConnection();
//     setupServer();
//   } catch (error) {
//     console.error('App launch error:', error.message);
//   }
// }

// bootstrap();

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
