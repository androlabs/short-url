import { ConfigService } from '@nestjs/config';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ITokenService } from 'src/contracts';
import { AuthDto } from '../dto';
import { SecurityConfig } from 'src/config';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  generateTokens(payload: AuthDto.EncodeToken): AuthDto.Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  generateAccessToken(payload: AuthDto.EncodeToken): string {
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(payload: AuthDto.EncodeToken): string {
    const securityConfig = this.configService.get<SecurityConfig>(
      'security',
    ) as SecurityConfig;

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string): AuthDto.Token {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  decodeToken(token: string): AuthDto.DecodedToken {
    return this.jwtService.decode(token);
  }
}
