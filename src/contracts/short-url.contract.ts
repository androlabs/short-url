import { ShortUrlDto } from 'src/modules/short-url/dto';
import { ShortUrl } from 'src/schemas/short-url.schema';

export interface ICreateShortUrlService {
  execute(data: ShortUrlDto.Create): Promise<ShortUrl>;
}

export interface IShortUrlRepository {
  save(data: ShortUrlDto.CreateDB): Promise<ShortUrl>;
}
