import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { IUserService } from 'src/contracts';
import { ILoginService, ISignUpService } from 'src/contracts/auth.contract';
import { User } from 'src/decorators';
import { AuthGuard } from 'src/guards';
import { User as UserSchema } from 'src/schemas/user.schema';
import { AuthDto } from './dto/auth.dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('ISignUpService')
    private signUpService: ISignUpService,
    @Inject('ILoginService')
    private loginService: ILoginService,
    @Inject('IUserService')
    private userService: IUserService,
  ) {}

  @Version('1')
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: AuthDto.SignUp })
  public async singUp(@Body() data: AuthDto.SignUp): Promise<UserSchema> {
    return await this.signUpService.execute(data);
  }

  @Version('1')
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: AuthDto.Login })
  public async login(@Body() data: AuthDto.Login): Promise<AuthDto.Token> {
    return await this.loginService.execute(data);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(
    @User() decode: AuthDto.EncodeToken,
  ): Promise<UserSchema | null> {
    return await this.userService.getById(decode.userId);
  }
}
