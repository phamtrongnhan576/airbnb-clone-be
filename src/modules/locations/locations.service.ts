import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/src/modules/prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLocationDto) {
    const existed = await this.prisma.locations.findUnique({
      where: {
        name_province: {
          name: dto.name,
          province: dto.province ?? '',
        },
      },
    });

    if (existed) {
      throw new BadRequestException('Location already exists');
    }

    return this.prisma.locations.create({
      data: {
        ...dto,
        province: dto.province ?? null,
        country: dto.country ?? null,
        image: dto.image ?? null,
      },
    });
  }

  async findAll() {
    return this.prisma.locations.findMany({
      where: { isDeleted: false },
    });
  }

  async search(keyword: string) {
    if (!keyword) return [];
    return this.prisma.locations.findMany({
      where: {
        name: {
          contains: keyword.toLowerCase(),
        },
      },
      orderBy: { createdAt: 'desc' },
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
