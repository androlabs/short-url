import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { compare, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { SecurityConfig } from 'src/config/config.interface';
import { IPasswordService } from 'src/contracts/auth.contract';

@Injectable()
export class PasswordService implements IPasswordService {
  get bcryptSaltRounds(): string | number {
    const securityConfig = this.configService.get<SecurityConfig>(
      'security',
    ) as SecurityConfig;
    const saltOrRounds = securityConfig.bcryptSaltOrRound;

    return Number.isInteger(Number(saltOrRounds))
      ? Number(saltOrRounds)
      : saltOrRounds;
  }

  constructor(private configService: ConfigService) {}

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
