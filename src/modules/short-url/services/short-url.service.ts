import { Inject, Injectable } from '@nestjs/common';
import { IShortUrlRepository, IShortUrlService } from 'src/contracts';
import { ShortUrl } from 'src/schemas';
import { ShortUrlPagination } from '../dto';

@Injectable()
export class ShortUrlService implements IShortUrlService {
  constructor(
    @Inject('IShortUrlRepository')
    private shortUrl: IShortUrlRepository,
  ) {}

  async getById(id: string): Promise<ShortUrl | null> {
    return await this.shortUrl.model.findOne({ shortUrl: id });
  }

  async listByUser(
    params: ShortUrlPagination.Params,
  ): Promise<ShortUrlPagination.Response> {
    const { userId } = params;
    const count = await this.shortUrl.model.countDocuments({ userId });

    const data = await this.shortUrl.model
      .find({ userId })
      .skip(params.page === 1 ? 0 : params.size * (params.page - 1))
      .limit(params.size)
      .sort('desc');

    return {
      data,
      size: params.size,
      page: params.page,
      count,
    };
  }
}
