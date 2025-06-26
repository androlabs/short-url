import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { MODELS } from 'src/enums';

export interface MetadataUrl extends Document {
  readonly shortUrl: string;
  readonly userAgent: string;
  readonly origin: string;
  readonly datetimeUtc: Date;
  readonly host: string;
}

export const MetadataUrlSchema = new mongoose.Schema<MetadataUrl>(
  {
    shortUrl: { type: String, index: true },
    userAgent: String,
    origin: String,
    datetimeUtc: Date,
    host: String,
  },
  { collection: MODELS.METADATA_URL_MODEL.COLLECTION },
);

MetadataUrlSchema.index({ shortUrl: 1, datetimeUtc: -1 });

MetadataUrlSchema.set('toJSON', {
  transform: function (_doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
