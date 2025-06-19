import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { CreateShortUrlService } from './services/create-short-url.service';

@Controller('short-url')
export class ShortUrlController {
  constructor(private createShortUrlService: CreateShortUrlService) {}

  @Version('1')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createShortUrlV1(): Promise<void> {
    await this.createShortUrlService.create({
      email: 'test',
      name: 'test',
      password: 'test',
    });
  }
}
