import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, MODELS } from 'src/enums';
import { MetadataUrlSchema, ShortUrlSchema, UserSchema } from 'src/schemas';

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
  {
    provide: MODELS.METADATA_URL_MODEL.NAME,
    useFactory: (connection: Connection) =>
      connection.model(MODELS.METADATA_URL_MODEL.COLLECTION, MetadataUrlSchema),
    inject: [DATABASE_CONNECTION],
  },
];
