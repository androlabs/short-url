import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, MODELS } from 'src/enums';
import { ShortUrlSchema } from 'src/schemas/short-url.schema';

export const shortUrlProviders = [
  {
    provide: MODELS.SHORT_URL_MODEL.NAME,
    useFactory: (connection: Connection) =>
      connection.model(MODELS.SHORT_URL_MODEL.COLLECTION, ShortUrlSchema),
    inject: [DATABASE_CONNECTION],
  },
];
