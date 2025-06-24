import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  ILoginService,
  ISignUpService,
  ITokenService,
  IUserService,
} from 'src/contracts';
import { User } from 'src/decorators';
import { AuthGuard } from 'src/guards';
import { User as UserDto, UserSwaggerDto } from 'src/schemas';
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
    @Inject('ITokenService')
    private tokenService: ITokenService,
  ) {}

  @Version('1')
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: AuthDto.SignUp })
  public async singUp(@Body() data: AuthDto.SignUp): Promise<UserDto> {
    return await this.signUpService.execute(data);
  }

  @Version('1')
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthDto.Login })
  public async login(@Body() data: AuthDto.Login): Promise<AuthDto.Token> {
    return await this.loginService.execute(data);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOkResponse({ type: UserSwaggerDto })
  async getProfile(
    @User() decode: AuthDto.EncodeToken,
  ): Promise<UserDto | null> {
    return await this.userService.getById(decode.userId);
  }

  @Get('refresh-token')
  async refreshToken(@Query('token') token: string): Promise<AuthDto.Token> {
    return this.tokenService.refreshToken(token);
  }
}
