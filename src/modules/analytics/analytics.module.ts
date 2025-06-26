import { Module } from '@nestjs/common';
import { schemasProviders } from 'src/providers';
import { MetadataUrlRepository } from 'src/repository';
import { DatabaseModule } from '../database/database.module';
import { MetadataUrlService } from './services';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...schemasProviders,
    {
      provide: 'IMetadataUrlService',
      useClass: MetadataUrlService,
    },
    {
      provide: 'IMetadataUrlRepository',
      useClass: MetadataUrlRepository,
    },
  ],
  exports: [
    {
      provide: 'IMetadataUrlService',
      useClass: MetadataUrlService,
    },
    {
      provide: 'IMetadataUrlRepository',
      useClass: MetadataUrlRepository,
    },
  ],
})
export class AnalyticsModule {}
