import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/modules/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentDto) {
    return this.prisma.comments.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.comments.findMany({
      include: { Users: true, Rooms: true },
    });
  }

  async findOne(id: number) {
    const comment = await this.prisma.comments.findUnique({
      where: { id },
      include: { Users: true, Rooms: true },
    });
    if (!comment) throw new NotFoundException(`Comment #${id} not found`);
    return comment;
  }

  async findByRoom(roomId: number) {
    return this.prisma.comments.findMany({
      where: { room_id: roomId },
      include: { Users: true },
    });
  }

  async update(id: number, dto: UpdateCommentDto) {
    await this.findOne(id);
    return this.prisma.comments.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.comments.delete({
      where: { id },
    });
  }
}
