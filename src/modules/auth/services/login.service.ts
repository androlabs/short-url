import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ILoginService,
  IPasswordService,
  ITokenService,
  IUserService,
} from 'src/contracts';
import { AuthDto } from '../dto';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject('IPasswordService')
    private passwordService: IPasswordService,
    @Inject('ITokenService')
    private tokenService: ITokenService,
    @Inject('IUserService')
    private userService: IUserService,
  ) {}

  async execute(data: AuthDto.Login): Promise<AuthDto.Token> {
    const user = await this.userService.getByEmail(data.email);

    if (!user) throw new NotFoundException('User not found');

    const passwordValid = await this.passwordService.validatePassword(
      data.password,
      user.password,
    );

    if (!passwordValid) throw new UnauthorizedException('User not found');

    return this.tokenService.generateTokens({ userId: user.id });
  }
}
