import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/src/modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existed = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });
    if (existed) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.users.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        avatar: dto.avatar || null,
        role: dto.role || 'user',
      },
    });
  }

  /** Lấy tất cả user */
  findAll() {
    return this.prisma.users.findMany({
      where: { isDeleted: false },
    });
  }

  async search(keyword: string) {
    if (!keyword) return [];
    return this.prisma.users.findMany({
      where: {
        name: {
          contains: keyword.toLowerCase(),
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /** Lấy user theo id */
  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  /** Cập nhật user */
  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);

    let data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  /** Xoá mềm user */
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.users.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
