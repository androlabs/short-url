import * as dotenv from 'dotenv';
import { Config } from './config.interface';

dotenv.config();

export const env: Config = {
  nest: {
    port: Number(process.env.PORT),
  },
  cors: {
    enabled: true,
  },
  throttler: {
    ttl: 60,
    limit: 100,
  },
  security: {
    expiresIn: '7d',
    refreshIn: '14d',
    confirmIn: '2d',
    passwordIn: '1d',
    bcryptSaltOrRound: 10,
  },
  mongoDb: {
    connectionString: String(process.env.MONGO_DB_STRING),
    dbName: String(process.env.MONGO_DB_NAME),
  },
};
