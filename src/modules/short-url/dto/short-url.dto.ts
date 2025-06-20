import { IsString } from 'class-validator';

export namespace ShortUrlDto {
  export class Create {
    @IsString()
    name: string;

    @IsString()
    originalUrl: string;
  }
}
