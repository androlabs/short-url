import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Request as RequestExpress } from 'express';
import {
  ICreateShortUrlService,
  IMetadataUrlService,
  IShortUrlService,
} from 'src/contracts';
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
    @Inject('IMetadataUrlService')
    private metadataUrlService: IMetadataUrlService,
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
  public async listByUserV1(
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

  @Version('1')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse()
  @ApiOkResponse()
  public async redirectV1(
    @Param('id') id: string,
    @Request() req: RequestExpress,
  ): Promise<{ url: string }> {
    const result = await this.shortUrlService.getById(id);

    if (!result?.shortUrl) throw new NotFoundException('URL invalid');

    await this.metadataUrlService.save({
      shortUrl: result.shortUrl,
      userAgent: req.headers['user-agent'] ?? 'unknown',
      origin: (req.headers['x-forward-for'] as string) ?? req.ip,
      datetimeUtc: new Date(),
      host: (req.headers['host'] as string) ?? 'unknown',
    });

    return { url: result.originalUrl };
  }
}
