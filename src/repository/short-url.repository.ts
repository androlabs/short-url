import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IShortUrlRepository } from 'src/contracts';
import { MODELS } from 'src/enums';
import { ShortUrlDto } from 'src/modules/short-url/dto';
import { ShortUrl } from 'src/schemas';

@Injectable()
export class ShortUrlRepository implements IShortUrlRepository {
  public readonly model: Model<ShortUrl>;

  constructor(
    @Inject(MODELS.SHORT_URL_MODEL.NAME)
    private readonly _model: Model<ShortUrl>,
  ) {
    this.model = this._model;
  }

  save(data: ShortUrlDto.CreateDB): Promise<ShortUrl> {
    const instance = new this.model(data);
    return instance.save();
  }
}
