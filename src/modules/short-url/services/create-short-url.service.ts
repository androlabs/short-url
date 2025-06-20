import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ICreateShortUrlService } from 'src/contracts';
import { MODELS } from 'src/enums';
import { ShortUrl } from 'src/schemas/short-url.schema';
import { ShortUrlDto } from '../dto';

@Injectable()
export class CreateShortUrlService implements ICreateShortUrlService {
  constructor(
    @Inject(MODELS.SHORT_URL_MODEL.NAME)
    private shortUrl: Model<ShortUrl>,
  ) {}

  private generateShortId(size: number = 6): string {
    const tokens =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < size; i++) {
      const indice = Math.floor(Math.random() * tokens.length);
      result += tokens.charAt(indice);
    }

    return result;
  }

  async execute(data: ShortUrlDto.Create): Promise<ShortUrl> {
    const shortUrl = new this.shortUrl({
      ...data,
      shortUrl: this.generateShortId(),
    });
    return shortUrl.save();
  }
}
