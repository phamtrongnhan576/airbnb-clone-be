import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  room_id: number;

  @ApiProperty({ example: 'Phòng sạch sẽ, view đẹp!' })
  @IsString()
  content: string;
}
