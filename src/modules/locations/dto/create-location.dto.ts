import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ example: 'Hà Nội' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Hà Nội', required: false, nullable: true })
  @IsOptional()
  @IsString()
  province?: string | null;

  @ApiProperty({ example: 'Việt Nam', required: false, nullable: true })
  @IsOptional()
  @IsString()
  country?: string | null;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  image?: string | null;

  @ApiProperty({
    example: 'Thủ đô ngàn năm văn hiến',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string | null;
}
