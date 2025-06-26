import { Inject, Injectable } from '@nestjs/common';
import { IMetadataUrlRepository, IMetadataUrlService } from 'src/contracts';
import { MetadataUrl } from 'src/schemas';

@Injectable()
export class MetadataUrlService implements IMetadataUrlService {
  constructor(
    @Inject('IMetadataUrlRepository')
    private metadataUrl: IMetadataUrlRepository,
  ) {}

  async save(data: MetadataUrl): Promise<MetadataUrl> {
    return this.metadataUrl.save(data);
  }
}
