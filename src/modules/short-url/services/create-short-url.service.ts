import { Inject, Injectable } from '@nestjs/common';
import { ICreateShortUrlService, IShortUrlRepository } from 'src/contracts';
import { ShortUrlDto } from '../dto';
import { ShortUrl } from 'src/schemas';

@Injectable()
export class CreateShortUrlService implements ICreateShortUrlService {
  constructor(
    @Inject('IShortUrlRepository')
    private shortUrl: IShortUrlRepository,
  ) {}

  private generateShortId(size: number = 6): string {
    const tokens =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < size; i++) {
      const index = Math.floor(Math.random() * tokens.length);
      result += tokens.charAt(index);
    }

    return result;
  }

  async execute(data: ShortUrlDto.Create): Promise<ShortUrl> {
    return this.shortUrl.save({
      ...data,
      shortUrl: this.generateShortId(),
    });
  }
}
