import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsInt,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: 'Phòng Deluxe' })
  @IsString()
  @IsNotEmpty()
  ten_phong: string;

  @ApiProperty({ example: 'Phòng có view đẹp', required: false })
  @IsOptional()
  @IsString()
  mo_ta?: string;

  @ApiProperty({ example: 500000 })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  gia_tien: number;

  @ApiProperty({ example: 2 })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  khach: number;

  @ApiProperty({ example: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  phong_ngu: number;

  @ApiProperty({ example: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  giuong: number;

  @ApiProperty({ example: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  phong_tam: number;

  @ApiProperty({ example: true })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  may_giat?: boolean;

  @ApiProperty({ example: true })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  ban_la?: boolean;

  @ApiProperty({ example: true })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  tivi?: boolean;

  @ApiProperty({ example: true })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  dieu_hoa?: boolean;

  @ApiProperty({ example: true })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  wifi?: boolean;

  @ApiProperty({ example: true })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  bep?: boolean;

  @ApiProperty({ example: true })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  do_xe?: boolean;

  @ApiProperty({ example: true })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  ho_boi?: boolean;

  @ApiProperty({ example: true })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  ban_ui?: boolean;

  @ApiProperty({
    example: ['https://img1.jpg', 'https://img2.jpg'],
    type: [String],
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [value];
      }
    }
    return Array.isArray(value) ? value : [];
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  hinh_anh?: string[];

  @ApiProperty({ example: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsOptional()
  location_id?: number;

  @ApiProperty({ example: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsOptional()
  host_id?: number;
}
