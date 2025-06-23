import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  ICreateUserService,
  IPasswordService,
  ISignUpService,
} from 'src/contracts';
import { AuthDto } from '../dto';
import { User } from 'src/schemas';

@Injectable()
export class SignUpService implements ISignUpService {
  constructor(
    @Inject('ICreateUserService')
    private createUserService: ICreateUserService,
    @Inject('IPasswordService')
    private passwordService: IPasswordService,
  ) {}

  async execute(data: AuthDto.SignUp): Promise<User> {
    const passwordHash = await this.passwordService.hashPassword(data.password);

    const user = await this.createUserService.save({
      ...data,
      id: randomUUID(),
      password: passwordHash,
    });

    return user;
  }
}
