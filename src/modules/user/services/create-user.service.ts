import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ICreateUserService,
  IUserRepository,
  IUserService,
} from 'src/contracts';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from '../dto';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
    @Inject('IUserService')
    private userService: IUserService,
  ) {}

  async save(data: CreateUserDto): Promise<User> {
    const userFound = await this.userService.getByEmail(data.email);
    if (!userFound) throw new UnprocessableEntityException();

    const user = await this.userRepository.save(data);
    return user;
  }
}
