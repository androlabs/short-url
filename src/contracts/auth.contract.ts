import { AuthDto } from 'src/modules/auth/dto/auth.dto';
import { User } from 'src/schemas/user.schema';

export interface ISignUpService {
  execute(data: AuthDto.SignUp): Promise<User>;
}
