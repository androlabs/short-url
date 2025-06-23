import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/env';

export const JwtInternalModule = JwtModule.registerAsync({
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get<string>('JWT_ACCESS_SECRET'),
      signOptions: {
        expiresIn: config().security.expiresIn,
      },
    };
  },
  inject: [ConfigService],
});
