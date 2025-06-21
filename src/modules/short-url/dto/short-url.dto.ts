import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
  }
}
