import { Module } from '@nestjs/common';
import { schemasProviders } from 'src/providers';
import { ShortUrlRepository } from 'src/repository';
import { AnalyticsModule } from '../analytics/analytics.module';
import { MetadataUrlService } from '../analytics/services';
import { JwtInternalModule } from '../auth/jwt.module';
import { DatabaseModule } from '../database/database.module';
import { CreateShortUrlService, ShortUrlService } from './services';
import { ShortUrlController } from './short-url.controller';

@Module({
  controllers: [ShortUrlController],
  imports: [JwtInternalModule, DatabaseModule, AnalyticsModule],
  providers: [
    ...schemasProviders,
    {
      provide: 'ICreateShortUrlService',
      useClass: CreateShortUrlService,
    },
    {
      provide: 'IShortUrlService',
      useClass: ShortUrlService,
    },
    {
      provide: 'IShortUrlRepository',
      useClass: ShortUrlRepository,
    },
    {
      provide: 'IMetadataUrlService',
      useClass: MetadataUrlService,
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
