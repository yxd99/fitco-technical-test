import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PayloadDto } from '@api/auth/dto/payload.dto';
import { Public } from '@common/guards/public.guard';
import { Payload } from '@shared/decorators';
import { ServiceResponse } from '@shared/types';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
@ApiBearerAuth()
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':videoId')
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('videoId', ParseIntPipe) videoId: number,
    @Payload() payload: PayloadDto,
  ): Promise<ServiceResponse> {
    const newComment = {
      ...createCommentDto,
      userId: payload.userId,
      videoId,
    };
    return this.commentsService.create(newComment);
  }

  @Public()
  @Get('video/:videoId')
  async findByVideo(
    @Param('videoId', ParseIntPipe) videoId: number,
    @Payload() payload: PayloadDto,
  ): Promise<Comment[]> {
    return this.commentsService.findByVideo(videoId, Boolean(payload));
  }

  @Public()
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Payload() payload: PayloadDto,
  ): Promise<Comment> {
    return this.commentsService.findOne(id, Boolean(payload));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Payload() payload: PayloadDto,
  ): Promise<ServiceResponse> {
    return this.commentsService.update(+id, updateCommentDto, payload);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Payload() payload: PayloadDto,
  ): Promise<ServiceResponse> {
    return this.commentsService.remove(+id, payload);
  }
}
