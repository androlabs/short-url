import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { MODELS } from 'src/enums';

export interface User extends Document {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export const UserSchema = new mongoose.Schema<User>(
  {
    id: String,
    name: String,
    email: String,
    password: String,
  },
  { collection: MODELS.USER_MODEL.COLLECTION },
);
