import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { User } from 'src/decorators';
import { AuthGuard } from 'src/guards';
import { ICreateShortUrlService } from '../../contracts';
import { AuthDto } from '../auth/dto';
import { ShortUrlDto } from './dto';
import { ShortUrl } from 'src/schemas';

@ApiBearerAuth()
@Controller('short-url')
export class ShortUrlController {
  constructor(
    @Inject('ICreateShortUrlService')
    private createShortUrlService: ICreateShortUrlService,
  ) {}

  @Version('1')
  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ShortUrlDto.Create })
  public async createShortUrlV1(
    @Body() data: ShortUrlDto.Create,
    @User() decode: AuthDto.EncodeToken,
  ): Promise<ShortUrl> {
    return await this.createShortUrlService.execute({
      ...data,
      userId: decode.userId,
    });
  }
}
