import { Module } from '@nestjs/common';
import { shortUrlProviders } from 'src/providers';
import { DatabaseModule } from '../database/database.module';
import { CreateShortUrlService } from './services';
import { ShortUrlController } from './short-url.controller';

@Module({
  controllers: [ShortUrlController],
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'ICreateShortUrlService',
      useClass: CreateShortUrlService,
    },
    ...shortUrlProviders,
  ],
  exports: [
    {
      provide: 'ICreateShortUrlService',
      useClass: CreateShortUrlService,
    },
  ],
})
export class ShortUrlModule {}
