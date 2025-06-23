import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/env';
import { schemasProviders } from 'src/providers';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { PasswordService, SignUpService, TokenService } from './services';
import { LoginService } from './services/login.service';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: config().security.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
    DatabaseModule,
    UserModule,
  ],
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
