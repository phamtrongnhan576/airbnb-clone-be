import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@/src/common/decorator/role.decorator';
import { Public } from '@/src/common/decorator/is-public.decorator';
@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Roles('admin')
  @Post()
  async create(@Body() dto: CreateLocationDto) {
    const location = await this.locationsService.create(dto);
    return {
      data: location,
      message: 'Location created successfully',
    };
  }

  @Public()
  @Get()
  async findAll() {
    const locations = await this.locationsService.findAll();
    return {
      data: locations,
      message: 'Locations fetched successfully',
    };
  }
  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const location = await this.locationsService.findOne(id);
    return {
      data: location,
      message: 'Location fetched successfully',
    };
  }

  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLocationDto,
  ) {
    const updated = await this.locationsService.update(id, dto);
    return {
      data: updated,
      message: 'Location updated successfully',
    };
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.locationsService.remove(id);
    return {
      data: deleted,
      message: 'Location deleted successfully',
    };
  }
}
