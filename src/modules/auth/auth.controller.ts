import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Version,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ISignUpService } from 'src/contracts/auth.contract';
import { User } from 'src/schemas/user.schema';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('ISignUpService')
    private signUpService: ISignUpService,
  ) {}

  @Version('1')
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: AuthDto.SignUp })
  public async createShortUrlV1(@Body() data: AuthDto.SignUp): Promise<User> {
    return await this.signUpService.execute(data);
  }
}
