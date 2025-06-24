import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ICreateShortUrlService, IShortUrlService } from 'src/contracts';
import { User } from 'src/decorators';
import { AuthGuard } from 'src/guards';
import { ShortUrl } from 'src/schemas';
import { AuthDto } from '../auth/dto';
import { ShortUrlDto, ShortUrlPagination } from './dto';

@ApiBearerAuth()
@Controller('short-url')
export class ShortUrlController {
  constructor(
    @Inject('ICreateShortUrlService')
    private createShortUrlService: ICreateShortUrlService,
    @Inject('IShortUrlService')
    private shortUrlService: IShortUrlService,
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

  @Version('1')
  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ShortUrlPagination.Response })
  public async listByUser(
    @Query() params: ShortUrlPagination.Params,
    @User() decode: AuthDto.EncodeToken,
  ): Promise<ShortUrlPagination.Response> {
    params.userId = decode.userId;
    params = {
      ...params,
      size: Number(params.size),
      page: Number(params.page),
    };
    return await this.shortUrlService.listByUser(params);
  }
}
