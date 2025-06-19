import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MODELS } from 'src/enums';
import { ShortUrl } from 'src/schemas/short-url.schema';
import { ShortUrlDto } from '../dto';

@Injectable()
// TODO: Implements Interface
// TODO: hash_id based in originalUrl
export class CreateShortUrlService {
  constructor(
    @Inject(MODELS.SHORT_URL_MODEL.NAME)
    private shortUrl: Model<ShortUrl>,
  ) {}

  async execute(data: ShortUrlDto.Create): Promise<ShortUrl> {
    const shortUrl = new this.shortUrl(data);
    return shortUrl.save();
  }
}
