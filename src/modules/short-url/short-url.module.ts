import { Module } from '@nestjs/common';
import { schemasProviders } from 'src/providers';
import { ShortUrlRepository } from 'src/repository';
import { JwtInternalModule } from '../auth/jwt.module';
import { DatabaseModule } from '../database/database.module';
import { CreateShortUrlService } from './services';
import { ShortUrlController } from './short-url.controller';

@Module({
  controllers: [ShortUrlController],
  imports: [JwtInternalModule, DatabaseModule],
  providers: [
    ...schemasProviders,
    {
      provide: 'ICreateShortUrlService',
      useClass: CreateShortUrlService,
    },
    {
      provide: 'IShortUrlRepository',
      useClass: ShortUrlRepository,
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
