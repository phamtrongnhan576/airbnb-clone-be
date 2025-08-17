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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() dto: CreateCommentDto) {
    const data = await this.commentsService.create(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Comment created successfully',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.commentsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get all comments successfully',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.commentsService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: `Get comment #${id} successfully`,
      data,
    };
  }

  @Get('room/:roomId')
  async findByRoom(@Param('roomId', ParseIntPipe) roomId: number) {
    const data = await this.commentsService.findByRoom(roomId);
    return {
      statusCode: HttpStatus.OK,
      message: `Get comments of room #${roomId} successfully`,
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommentDto,
  ) {
    const data = await this.commentsService.update(id, dto);
    return {
      statusCode: HttpStatus.OK,
      message: `Comment #${id} updated successfully`,
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.commentsService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: `Comment #${id} deleted successfully`,
      data,
    };
  }
}
