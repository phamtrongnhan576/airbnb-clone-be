import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'alice1@example.com' }) @IsEmail() email: string;
  @ApiProperty({example: 'alice123', minLength: 6 }) @MinLength(6) password: string;
}
