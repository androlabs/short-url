import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ShortUrl } from 'src/schemas/short-url.schema';
import { ShortUrlDto } from '../dto';

@Injectable()
export class CreateShortUrlService {
  constructor(
    @Inject('SHORT_URL_MODEL')
    private shortUrl: Model<ShortUrl>,
  ) {}

  async execute(data: ShortUrlDto.Create): Promise<ShortUrl> {
    const shortUrl = new this.shortUrl(data);
    return shortUrl.save();
  }
}
