import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@/src/common/decorator/role.decorator';
import { ApiAvatarUpload } from '@/src/common/swagger/upload-avatar.swagger';
import { AvatarUploadInterceptor } from '@/src/common/multer/cloudinary/cloudinary.multer';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @UseInterceptors(AvatarUploadInterceptor)
  @ApiAvatarUpload()
  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return {
      data: user,
      message: 'User created successfully',
    };
  }

  @Roles('admin')
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      data: users,
      message: 'Users fetched successfully',
    };
  }

  @Roles('admin')
  @Get('search')
  async search(@Query('keyword') keyword: string) {
    const users = await this.usersService.search(keyword);
    return {
      data: users,
      message: 'Search users successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    return {
      data: user,
      message: 'User fetched successfully',
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    const updated = await this.usersService.update(id, dto);
    return {
      data: updated,
      message: 'User updated successfully',
    };
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.usersService.remove(id);
    return {
      data: deleted,
      message: 'User deleted successfully',
    };
  }
}
