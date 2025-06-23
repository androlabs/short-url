import { Module } from '@nestjs/common';
import { schemasProviders } from 'src/providers';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtInternalModule } from './jwt.module';
import { PasswordService, SignUpService, TokenService } from './services';
import { LoginService } from './services/login.service';

@Module({
  controllers: [AuthController],
  imports: [JwtInternalModule, DatabaseModule, UserModule],
  providers: [
    ...schemasProviders,
    {
      provide: 'ISignUpService',
      useClass: SignUpService,
    },
    {
      provide: 'ILoginService',
      useClass: LoginService,
    },
    {
      provide: 'IPasswordService',
      useClass: PasswordService,
    },
    {
      provide: 'ITokenService',
      useClass: TokenService,
    },
  ],
  exports: [
    {
      provide: 'IPasswordService',
      useClass: PasswordService,
    },
  ],
})
export class AuthModule {}
