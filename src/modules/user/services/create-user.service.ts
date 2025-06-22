import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ICreateUserService, IUserRepository } from 'src/contracts';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from '../dto';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
  ) {}

  async save(data: CreateUserDto): Promise<User> {
    const userFound = await this.userRepository.model.find({
      email: data.email,
    });
    if (userFound.length !== 0) throw new UnprocessableEntityException();

    const user = await this.userRepository.save(data);
    return user;
  }
}
