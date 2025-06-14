import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
@Controller('projects/:projectId/tasks/:taskId/comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param('taskId') taskId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ) {
    return this.commentsService.create(createCommentDto, +taskId, req.user.userId);
  }

  @Get()
  findAll(@Param('taskId') taskId: string) {
    return this.commentsService.findAll(+taskId);
  }

  @Get(':id')
  findOne(@Param('taskId') taskId: string, @Param('id') id: string) {
    return this.commentsService.findOne(+id, +taskId);
  }

  @Delete(':id')
  remove(@Param('taskId') taskId: string, @Param('id') id: string) {
    return this.commentsService.remove(+id, +taskId);
  }
} 