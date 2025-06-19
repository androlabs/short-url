import { Connection } from 'mongoose';
import { ShortUrlSchema } from 'src/schemas/short-url.schema';

export const shortUrlProviders = [
  {
    provide: 'SHORT_URL_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('ShortUrl', ShortUrlSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
