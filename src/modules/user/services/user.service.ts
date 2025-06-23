import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, IUserService } from 'src/contracts';
import { User } from 'src/schemas';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
  ) {}

  async getById(id: string): Promise<User | null> {
    return await this.userRepository.model.findOne({ id });
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.userRepository.model.findOne({ email });
  }
}
