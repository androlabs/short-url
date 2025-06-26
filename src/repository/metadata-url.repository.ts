import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IMetadataUrlRepository } from 'src/contracts';
import { MODELS } from 'src/enums';
import { MetadataUrlDto } from 'src/modules/analytics/dto';
import { MetadataUrl } from 'src/schemas';

@Injectable()
export class MetadataUrlRepository implements IMetadataUrlRepository {
  public readonly model: Model<MetadataUrl>;

  constructor(
    @Inject(MODELS.METADATA_URL_MODEL.NAME)
    private readonly _model: Model<MetadataUrl>,
  ) {
    this.model = this._model;
  }

  async save(data: MetadataUrlDto.Create): Promise<MetadataUrl> {
    const instance = new this.model(data);
    return instance.save();
  }
}
