import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/env';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AuthModule } from './modules/auth/auth.module';
import { ShortUrlModule } from './modules/short-url/short-url.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    // TODO: Config ThrottlerModule
    AuthModule,
    UserModule,
    ShortUrlModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
