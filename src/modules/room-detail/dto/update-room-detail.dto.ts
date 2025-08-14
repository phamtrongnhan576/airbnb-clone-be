import { PartialType } from '@nestjs/swagger';
import { CreateRoomDetailDto } from './create-room-detail.dto';

export class UpdateRoomDetailDto extends PartialType(CreateRoomDetailDto) {}
