import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from 'src/enums';
import { env } from '../env';

export const mongoDbProvider = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(env.mongoDb.connectionString, {
        dbName: env.mongoDb.dbName,
      }),
  },
];
