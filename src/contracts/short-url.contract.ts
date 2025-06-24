import { Model } from 'mongoose';
import { ShortUrlDto, ShortUrlPagination } from 'src/modules/short-url/dto';
import { ShortUrl } from 'src/schemas';

export interface ICreateShortUrlService {
  execute(data: ShortUrlDto.Create): Promise<ShortUrl>;
}

export interface IShortUrlService {
  getById(id: string): Promise<ShortUrl | null>;
  listByUser(
    params: ShortUrlPagination.Params,
  ): Promise<ShortUrlPagination.Response>;
}

export interface IShortUrlRepository {
  model: Model<ShortUrl>;
  save(data: ShortUrlDto.CreateDB): Promise<ShortUrl>;
}
