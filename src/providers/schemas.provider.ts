import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, MODELS } from 'src/enums';
import { ShortUrlSchema } from 'src/schemas/short-url.schema';
import { UserSchema } from 'src/schemas/user.schema';

export const schemasProviders = [
  {
    provide: MODELS.SHORT_URL_MODEL.NAME,
    useFactory: (connection: Connection) =>
      connection.model(MODELS.SHORT_URL_MODEL.COLLECTION, ShortUrlSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: MODELS.USER_MODEL.NAME,
    useFactory: (connection: Connection) =>
      connection.model(MODELS.USER_MODEL.COLLECTION, UserSchema),
    inject: [DATABASE_CONNECTION],
  },
];
