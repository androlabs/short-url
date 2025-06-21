import { ShortUrlDto } from 'src/modules/short-url/dto';
import { ShortUrl } from 'src/schemas/short-url.schema';

export interface IShortUrlRepository {
  save(data: ShortUrlDto.CreateDB): Promise<ShortUrl>;
}
