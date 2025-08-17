import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/src/common/decorator/is-public.decorator';
import { Roles } from '@/src/common/decorator/role.decorator';
import { User } from '@/src/common/decorator/user.decorator';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Public()
  @Post()
  async create(@Body() dto: CreateBookingDto) {
    const data = await this.bookingService.create(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Booking created successfully',
      data,
    };
  }

  @Public()
  @Get()
  async findAll() {
    const data = await this.bookingService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get all bookings successfully',
      data,
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.bookingService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: `Get booking #${id} successfully`,
      data,
    };
  }

  @Roles('admin')
  @Get('user/:userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number) {
    const data = await this.bookingService.findByUserId(userId);
    return {
      statusCode: HttpStatus.OK,
      message: `Get bookings of user #${userId} successfully`,
      data,
    };
  }

  @Roles('admin', 'user')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookingDto,
    @User() user: any,
  ) {
    const data = await this.bookingService.update(id, dto, user);
    return {
      statusCode: HttpStatus.OK,
      message: `Booking #${id} updated successfully`,
      data,
    };
  }

  @Roles('admin', 'user')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @User() user: any) {
    const data = await this.bookingService.remove(id, user);
    return {
      statusCode: HttpStatus.OK,
      message: `Booking #${id} deleted successfully`,
      data,
    };
  }
}
