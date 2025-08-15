import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/modules/prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLocationDto) {
    return this.prisma.locations.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.locations.findMany({
      where: { isDeleted: false },
    });
  }

  async findOne(id: number) {
    const location = await this.prisma.locations.findUnique({
      where: { id },
    });
    if (!location || location.isDeleted) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async update(id: number, dto: UpdateLocationDto) {
    await this.findOne(id);
    return this.prisma.locations.update({
      where: { id },
      data: { ...dto, updatedAt: new Date() },
    });
  }

  async remove(id: number, deletedBy = 0) {
    await this.findOne(id);
    return this.prisma.locations.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedBy,
        deletedAt: new Date(),
      },
    });
  }
}
