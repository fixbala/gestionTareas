import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects/:projectId/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Param('projectId') projectId: string,
    @Body() createTaskDto: CreateTaskDto,
    @Request() req,
  ) {
    return this.tasksService.create(createTaskDto, +projectId, req.user.userId);
  }

  @Get()
  findAll(@Param('projectId') projectId: string, @Request() req) {
    return this.tasksService.findAll(+projectId, req.user.userId);
  }

  @Get(':id')
  findOne(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.tasksService.findOne(+id, +projectId, req.user.userId);
  }

  @Put(':id')
  update(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: CreateTaskDto,
    @Request() req,
  ) {
    return this.tasksService.update(+id, updateTaskDto, +projectId, req.user.userId);
  }

  @Delete(':id')
  remove(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.tasksService.remove(+id, +projectId, req.user.userId);
  }
} 