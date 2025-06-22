import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from 'src/enums';
import { MongoDbConfig } from '../config.interface';

export const mongoDbProvider = [
  {
    provide: DATABASE_CONNECTION,
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const mongoDb = configService.get<MongoDbConfig>(
        'mongoDb',
      ) as MongoDbConfig;

      return mongoose.connect(mongoDb.connectionString, {
        dbName: mongoDb.dbName,
      });
    },
  },
];
