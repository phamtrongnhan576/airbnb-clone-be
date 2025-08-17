import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/modules/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRoomDto) {
    return this.prisma.rooms.create({
      data: dto,
      include: { Locations: true, Users: true },
    });
  }

  async findAll() {
    return this.prisma.rooms.findMany({
      include: { Locations: true, Users: true },
    });
  }

  async findByLocationName(name: string) {
    const rooms = await this.prisma.rooms.findMany({
      where: {
        Locations: {
          name: {
            contains: name.toLowerCase(),
          },
        },
      },
      include: { Locations: true, Users: true },
    });
    return rooms;
  }

  async findOne(id: number) {
    const room = await this.prisma.rooms.findUnique({
      where: { id },
      include: { Locations: true, Users: true },
    });
    if (!room) throw new NotFoundException(`Room ${id} not found`);
    return room;
  }

  async update(id: number, dto: UpdateRoomDto) {
    const existed = await this.prisma.rooms.findUnique({ where: { id } });
    if (!existed) throw new NotFoundException(`Room ${id} not found`);

    return this.prisma.rooms.update({
      where: { id },
      data: dto,
      include: { Locations: true, Users: true },
    });
  }

  async remove(id: number) {
    const existed = await this.prisma.rooms.findUnique({ where: { id } });
    if (!existed) throw new NotFoundException(`Room ${id} not found`);

    await this.prisma.rooms.delete({ where: { id } });
    return existed;
  }
}
