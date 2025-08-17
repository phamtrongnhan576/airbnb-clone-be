import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  room_id: number;

  @ApiProperty({ example: '2025-08-20' })
  @IsDateString()
  check_in_date: string;

  @ApiProperty({ example: '2025-08-25' })
  @IsDateString()
  check_out_date: string;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsInt()
  guests_count?: number;

  @ApiProperty({ example: 150.5, required: false })
  @IsOptional()
  @IsNumber()
  total_price?: number;
}
