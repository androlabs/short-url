import { Model } from 'mongoose';
import { MetadataUrlDto } from 'src/modules/analytics/dto';
import { MetadataUrl } from 'src/schemas';

export interface IMetadataUrlService {
  save(data: MetadataUrlDto.Create): Promise<MetadataUrl>;
}

export interface IMetadataUrlRepository {
  model: Model<MetadataUrl>;
  save(data: MetadataUrlDto.Create): Promise<MetadataUrl>;
}
