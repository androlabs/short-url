import { Module } from '@nestjs/common';
import { shortUrlProviders } from 'src/providers';
import { DatabaseModule } from '../database/database.module';
import { CreateShortUrlService } from './services/create-short-url.service';
import { ShortUrlController } from './short-url.controller';

@Module({
  controllers: [ShortUrlController],
  imports: [DatabaseModule],
  providers: [CreateShortUrlService, ...shortUrlProviders],
})
export class ShortUrlModule {}
