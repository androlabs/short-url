import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ISignUpService } from 'src/contracts/auth.contract';
import { MODELS } from 'src/enums';
import { User } from 'src/schemas/user.schema';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class SignUpService implements ISignUpService {
  constructor(
    @Inject(MODELS.USER_MODEL.NAME)
    private user: Model<User>,
  ) {}

  async execute(data: AuthDto.SignUp): Promise<User> {
    console.log(data);
    // TODO: hash password
    // TODO: verify if user not have exist email

    return null as unknown as User;
  }
}
