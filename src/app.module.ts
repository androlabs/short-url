import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ShortUrlModule } from './modules/short-url/short-url.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, UserModule, ShortUrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
