import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ShortUrl } from 'src/schemas/short-url.schema';
import { CreateShortUrlDto } from '../dto';

@Injectable()
export class CreateShortUrlService {
  constructor(
    @Inject('SHORT_URL_MODEL')
    private shortUrl: Model<ShortUrl>,
  ) {}

  async create(data: CreateShortUrlDto): Promise<ShortUrl> {
    const shortUrl = new this.shortUrl(data);
    return shortUrl.save();
  }

  async findAll(): Promise<ShortUrl[]> {
    return this.shortUrl.find().exec();
  }
}
