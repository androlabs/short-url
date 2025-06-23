import { Model } from 'mongoose';
import { CreateUserDto } from 'src/modules/user/dto';
import { User } from 'src/schemas/user.schema';

export interface ICreateUserService {
  save(data: CreateUserDto): Promise<User>;
}

export interface IUserService {
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
}

export interface IUserRepository {
  model: Model<User>;
  save(data: CreateUserDto): Promise<User>;
}
