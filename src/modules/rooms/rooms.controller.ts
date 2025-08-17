import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Roles } from '@/src/common/decorator/role.decorator';
import { Public } from '@/src/common/decorator/is-public.decorator';
import { RoomUploadInterceptor } from '@/src/common/multer/cloudinary/cloudinary.multer';
import { ApiTags } from '@nestjs/swagger';
import { ApiRoomUpload } from '@/src/common/swagger/room.swagger';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @Roles('admin')
  @UseInterceptors(RoomUploadInterceptor)
  @ApiRoomUpload()
  async create(
    @Body() dto: CreateRoomDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files?.length) {
      dto.hinh_anh = files.map((f) => f.path);
    }
    const room = await this.roomsService.create(dto);
    return {
      statusCode: 201,
      message: `Room '${room.ten_phong}' created successfully`,
      data: room,
    };
  }

  @Public()
  @Get()
  async findAll() {
    const rooms = await this.roomsService.findAll();
    return {
      statusCode: 200,
      message: `Retrieved ${rooms.length} rooms successfully`,
      data: rooms,
    };
  }

  @Public()
  @Get('search/by-location')
  async findByLocation(@Query('name') name: string) {
    const rooms = await this.roomsService.findByLocationName(name);
    return {
      statusCode: 200,
      message: `Found ${rooms.length} rooms at location name contains '${name}'`,
      data: rooms,
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const room = await this.roomsService.findOne(id);
    return {
      statusCode: 200,
      message: `Retrieved room '${room.ten_phong}' successfully`,
      data: room,
    };
  }

  @Roles('admin')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoomDto,
  ) {
    const updated = await this.roomsService.update(id, dto);
    return {
      statusCode: 200,
      message: `Room '${updated.ten_phong}' updated successfully`,
      data: updated,
    };
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.roomsService.remove(id);
    return {
      statusCode: 200,
      message: `Room '${deleted.ten_phong}' deleted successfully`,
      data: deleted,
    };
  }
}
