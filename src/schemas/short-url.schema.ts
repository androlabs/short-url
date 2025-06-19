import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface ShortUrl extends Document {
  readonly name: string;
  readonly email: number;
  readonly password: string;
}

export const ShortUrlSchema = new mongoose.Schema<ShortUrl>({
  name: String,
  email: String,
  password: String,
});
