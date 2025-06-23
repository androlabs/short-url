import { LoginDto } from './login.dto';
import { SignUpDto } from './signup.dto';
import { DecodedJwtToken, EncodeJwtToken, TokenDto } from './token.dto';

export namespace AuthDto {
  export class SignUp extends SignUpDto {}
  export class Login extends LoginDto {}
  export class Token extends TokenDto {}
  export class DecodedToken extends DecodedJwtToken {}
  export class EncodeToken extends EncodeJwtToken {}
}
