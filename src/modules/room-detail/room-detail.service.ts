import { Injectable } from '@nestjs/common';
import { CreateRoomDetailDto } from './dto/create-room-detail.dto';
import { UpdateRoomDetailDto } from './dto/update-room-detail.dto';

@Injectable()
export class RoomDetailService {
  create(createRoomDetailDto: CreateRoomDetailDto) {
    return 'This action adds a new roomDetail';
  }

  findAll() {
    return `This action returns all roomDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomDetail`;
  }

  update(id: number, updateRoomDetailDto: UpdateRoomDetailDto) {
    return `This action updates a #${id} roomDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomDetail`;
  }
}
