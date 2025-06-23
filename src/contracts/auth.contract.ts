import { AuthDto } from 'src/modules/auth/dto/auth.dto';
import { User } from 'src/schemas/user.schema';

export interface ISignUpService {
  execute(data: AuthDto.SignUp): Promise<User>;
}
export interface ILoginService {
  execute(data: AuthDto.Login): Promise<AuthDto.Token>;
}

export interface IPasswordService {
  validatePassword(password: string, hashedPassword: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
  randomPassword(): Promise<string>;
}

export interface ITokenService {
  generateTokens(payload: AuthDto.EncodeToken): AuthDto.Token;
  generateAccessToken(payload: AuthDto.EncodeToken): string;
  generateRefreshToken(payload: AuthDto.EncodeToken): string;
  refreshToken(token: string): AuthDto.Token;
  decodeToken(token: string): AuthDto.DecodedToken;
}
