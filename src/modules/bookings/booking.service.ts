import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/src/modules/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  /** Tạo mới booking */
  async create(dto: CreateBookingDto) {
    return this.prisma.bookings.create({
      data: {
        ...dto,
        check_in_date: new Date(dto.check_in_date),
        check_out_date: new Date(dto.check_out_date),
      },
    });
  }

  /** Lấy tất cả booking */
  async findAll() {
    return this.prisma.bookings.findMany({
      where: { isDeleted: false },
      include: {
        Users: true,
        Rooms: true,
      },
    });
  }

  /** Lấy booking theo id */
  async findOne(id: number) {
    const booking = await this.prisma.bookings.findUnique({
      where: { id },
      include: { Users: true, Rooms: true },
    });
    if (!booking || booking.isDeleted)
      throw new NotFoundException(`Booking #${id} not found`);
    return booking;
  }

  /** Lấy booking theo user */
  async findByUserId(userId: number, includeDeleted = false) {
    return this.prisma.bookings.findMany({
      where: {
        user_id: userId,
        ...(includeDeleted ? {} : { isDeleted: false }),
      },
      include: { Users: true, Rooms: true },
    });
  }

  /** Cập nhật booking */
  async update(id: number, dto: UpdateBookingDto, user: any) {
    const booking = await this.findOne(id);

    if (user.role !== 'admin' && booking.user_id !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to update this booking',
      );
    }

    return this.prisma.bookings.update({
      where: { id },
      data: {
        ...dto,
        check_in_date: dto.check_in_date
          ? new Date(dto.check_in_date)
          : undefined,
        check_out_date: dto.check_out_date
          ? new Date(dto.check_out_date)
          : undefined,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: number, user: any) {
    const booking = await this.findOne(id);

    if (user.role !== 'admin' && booking.user_id !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to delete this booking',
      );
    }

    return this.prisma.bookings.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
