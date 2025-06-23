import { Inject, Injectable } from '@nestjs/common';
import { ILoginService, IPasswordService, ITokenService } from 'src/contracts';
import { AuthDto } from '../dto';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject('IPasswordService')
    private passwordService: IPasswordService,
    @Inject('ITokenService')
    private tokenService: ITokenService,
  ) {}

  async execute(data: AuthDto.Login): Promise<AuthDto.Token> {
    console.log(data);
    return this.tokenService.generateTokens({ userId: '123' });
  }
}
