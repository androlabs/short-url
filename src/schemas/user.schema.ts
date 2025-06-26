import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { MODELS } from 'src/enums';

export class UserSwaggerDto {
  @ApiProperty({
    type: String,
    example: 'c38ac87e-b582-45c8-9bec-0a6f481ceb0e',
  })
  id: string;
  @ApiProperty({ type: String, example: 'Gabriel' })
  name: string;
  @ApiProperty({ type: String, example: 'gabriel@email.com' })
  email: string;
}

export interface User extends Document {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export const UserSchema = new mongoose.Schema<User>(
  {
    id: { type: String, index: true, unique: true },
    name: String,
    email: { type: String, index: true, unique: true },
    password: String,
  },
  { collection: MODELS.USER_MODEL.COLLECTION },
);

UserSchema.set('toJSON', {
  transform: function (_doc, ret) {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});
