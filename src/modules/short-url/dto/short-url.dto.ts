import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString } from 'class-validator';
import { ShortUrl } from 'src/schemas';

export namespace ShortUrlDto {
  export class Create {
    @IsString()
    @ApiProperty({
      type: String,
      example: 'My example short url',
    })
    name: string;

    @IsString()
    @ApiProperty({
      type: String,
      example: 'https://google.com',
    })
    originalUrl: string;
    userId: string;
  }

  export class CreateDB {
    name: string;
    originalUrl: string;
    shortUrl: string;
    userId: string;
  }
}

export namespace ShortUrlPagination {
  export class Params {
    userId: string;

    @Type(() => Number)
    @IsPositive()
    @IsNumber()
    @ApiProperty({ type: Number, example: 1 })
    page: number;

    @Type(() => Number)
    @IsPositive()
    @IsNumber()
    @ApiProperty({ type: Number, example: 10 })
    size: number;
  }

  export class Response {
    data: ShortUrl[];
    page: number;
    size: number;
    count: number;
  }
}
