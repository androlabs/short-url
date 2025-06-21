import { Module } from '@nestjs/common';
import { schemasProviders } from 'src/providers';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { PasswordService, SignUpService } from './services';

@Module({
  controllers: [AuthController],
  imports: [DatabaseModule],
  providers: [
    ...schemasProviders,
    {
      provide: 'ISignUpService',
      useClass: SignUpService,
    },
    {
      provide: 'IPasswordService',
      useClass: PasswordService,
    },
  ],
})
export class AuthModule {}
