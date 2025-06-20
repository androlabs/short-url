import { ShortUrl } from 'src/schemas/short-url.schema';
import { ShortUrlDto } from '../modules/short-url/dto';

export interface ICreateShortUrlService {
  execute(data: ShortUrlDto.Create): Promise<ShortUrl>;
}
