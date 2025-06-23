import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'gabriel@email.com',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    type: String,
    example: 'password@123',
  })
  password: string;
}
