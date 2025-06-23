import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { ILoginService, ISignUpService } from 'src/contracts/auth.contract';
import { AuthGuard } from 'src/guards';
import { User } from 'src/schemas/user.schema';
import { AuthDto } from './dto/auth.dto';
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('ISignUpService')
    private signUpService: ISignUpService,
    @Inject('ILoginService')
    private loginService: ILoginService,
  ) {}

  @Version('1')
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: AuthDto.SignUp })
  public async singUp(@Body() data: AuthDto.SignUp): Promise<User> {
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
  getProfile(@Request() req: Request) {
    console.log(req);
    return 1;
  }
}
