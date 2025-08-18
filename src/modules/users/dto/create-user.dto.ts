import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsString,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Alice' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'alice@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6, example: '123456' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', required: false })
  @IsOptional()
  avatar?: string;

  @ApiProperty({ example: 'user', enum: ['user', 'admin'], required: false })
  @IsIn(['user', 'admin'])
  role?: 'user' | 'admin';
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  birthday?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  gender?: string;
}
