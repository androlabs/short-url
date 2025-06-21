import { Module } from '@nestjs/common';
import { schemasProviders } from 'src/providers';
import { DatabaseModule } from '../database/database.module';
import { CreateShortUrlService } from './services';
import { ShortUrlController } from './short-url.controller';

@Module({
  controllers: [ShortUrlController],
  imports: [DatabaseModule],
  providers: [
    ...schemasProviders,
    {
      provide: 'ICreateShortUrlService',
      useClass: CreateShortUrlService,
    },
  ],
  exports: [
    {
      provide: 'ICreateShortUrlService',
      useClass: CreateShortUrlService,
    },
  ],
})
export class ShortUrlModule {}
