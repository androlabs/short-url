import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Version,
} from '@nestjs/common';
import { ShortUrl } from 'src/schemas/short-url.schema';
import { ICreateShortUrlService } from '../../contracts';
import { ShortUrlDto } from './dto';

@Controller('short-url')
export class ShortUrlController {
  constructor(
    @Inject('ICreateShortUrlService')
    private createShortUrlService: ICreateShortUrlService,
  ) {}

  @Version('1')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createShortUrlV1(
    @Body() data: ShortUrlDto.Create,
  ): Promise<ShortUrl> {
    return await this.createShortUrlService.execute(data);
  }
}
