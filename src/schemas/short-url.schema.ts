import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { MODELS } from 'src/enums';

export interface ShortUrl extends Document {
  readonly name: string;
  readonly originalUrl: string;
  readonly shortUrl: string;
  readonly userId: string;
}

export const ShortUrlSchema = new mongoose.Schema<ShortUrl>(
  {
    name: String,
    originalUrl: String,
    shortUrl: String,
    userId: String,
  },
  { collection: MODELS.SHORT_URL_MODEL.COLLECTION },
);

ShortUrlSchema.set('toJSON', {
  transform: function (_doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
