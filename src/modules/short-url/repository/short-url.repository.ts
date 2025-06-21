import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IShortUrlRepository } from 'src/contracts';
import { MODELS } from 'src/enums';
import { ShortUrl } from 'src/schemas/short-url.schema';
import { ShortUrlDto } from '../dto';

@Injectable()
export class ShortUrlRepository implements IShortUrlRepository {
  public readonly model: Model<ShortUrl>;

  constructor(
    @Inject(MODELS.SHORT_URL_MODEL.NAME)
    private readonly shortUrl: Model<ShortUrl>,
  ) {
    this.model = this.shortUrl;
  }

  save(data: ShortUrlDto.CreateDB): Promise<ShortUrl> {
    const instance = new this.shortUrl(data);
    return instance.save();
  }
}
