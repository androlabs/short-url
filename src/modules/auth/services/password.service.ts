import { Injectable } from '@nestjs/common';

import { compare, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { env } from 'src/config';
import { IPasswordService } from 'src/contracts/auth.contract';

@Injectable()
export class PasswordService implements IPasswordService {
  get bcryptSaltRounds(): number {
    return env.security.bcryptSaltOrRound;
  }

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  hashPassword(password: string): Promise<string> {
    return hash(password, this.bcryptSaltRounds);
  }

  randomPassword(): Promise<string> {
    return hash(randomUUID(), this.bcryptSaltRounds);
  }
}
