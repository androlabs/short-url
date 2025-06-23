import { createParamDecorator } from '@nestjs/common';
import { AuthDto } from 'src/modules/auth/dto';

export const User = createParamDecorator((_data, req) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const user = req.switchToHttp().getRequest().user;
  return user as AuthDto.EncodeToken;
});
