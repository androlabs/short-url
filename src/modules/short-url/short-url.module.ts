import { Module } from '@nestjs/common';
import { shortUrlProviders } from 'src/providers';
import { DatabaseModule } from '../database/database.module';
import { ShortUrlController } from './short-url.controller';
import { CreateShortUrlService } from './services';

@Module({
  controllers: [ShortUrlController],
  imports: [DatabaseModule],
  providers: [CreateShortUrlService, ...shortUrlProviders],
})
export class ShortUrlModule {}
