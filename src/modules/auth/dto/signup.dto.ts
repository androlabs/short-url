import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  @ApiProperty({
    type: String,
    example: 'Gabriel',
  })
  name: string;

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
