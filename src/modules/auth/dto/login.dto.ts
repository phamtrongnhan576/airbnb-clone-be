import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'alice@mail.com' }) @IsEmail() email: string;
  @ApiProperty({ minLength: 6 }) @MinLength(6) password: string;
}
