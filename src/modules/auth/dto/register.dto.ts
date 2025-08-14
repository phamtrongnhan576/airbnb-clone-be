import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Alice' }) @IsNotEmpty() name: string;
  @ApiProperty({ example: 'alice@mail.com' }) @IsEmail() email: string;
  @ApiProperty({ minLength: 6 }) @MinLength(6) password: string;
}
