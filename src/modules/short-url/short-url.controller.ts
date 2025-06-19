import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { ShortUrl } from 'src/schemas/short-url.schema';
import { ShortUrlDto } from './dto';
import { CreateShortUrlService } from './services/create-short-url.service';

@Controller('short-url')
// TODO: interface implements
export class ShortUrlController {
  constructor(private createShortUrlService: CreateShortUrlService) {}

  @Version('1')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createShortUrlV1(
    @Body() data: ShortUrlDto.Create,
  ): Promise<ShortUrl> {
    return await this.createShortUrlService.execute(data);
  }
}
