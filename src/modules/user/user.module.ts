import { Module } from '@nestjs/common';
import { schemasProviders } from 'src/providers';
import { UserRepository } from 'src/repository/user.repository';
import { DatabaseModule } from '../database/database.module';
import { CreateUserService, UserService } from './services';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule],
  providers: [
    ...schemasProviders,
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: 'ICreateUserService',
      useClass: CreateUserService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [
    ...schemasProviders,
    {
      provide: 'ICreateUserService',
      useClass: CreateUserService,
    },
    {
      provide: 'IUserService',
      useClass: UserService,
    },
  ],
})
export class UserModule {}
