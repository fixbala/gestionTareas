import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
 
  async create(createTaskDto: CreateTaskDto, projectId: number, userId: number): Promise<Task> {
    const taskData: Partial<Task> = {
      ...createTaskDto,
      project: { id: projectId } as Project,
      assignedTo: createTaskDto.assignedToId ? { id: createTaskDto.assignedToId } as User : undefined,
    };

    const task = this.tasksRepository.create(taskData);
    return this.tasksRepository.save(task);
  }

  async findAll(projectId: number, userId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { project: { id: projectId, createdBy: { id: userId } } },
      relations: ['assignedTo', 'project', 'comments'],
    });
  }

  async findOne(id: number, projectId: number, userId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { 
        id, 
        project: { 
          id: projectId, 
          createdBy: { id: userId } 
        } 
      },
      relations: ['assignedTo', 'project', 'comments', 'comments.user'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(
    id: number,
    updateTaskDto: Partial<CreateTaskDto>,
    projectId: number,
    userId: number,
  ): Promise<Task> {
    const updateData: Partial<Task> = {
      ...updateTaskDto,
      assignedTo: updateTaskDto.assignedToId ? { id: updateTaskDto.assignedToId } as User : undefined,
    };

    await this.tasksRepository.update(
      { 
        id, 
        project: { 
          id: projectId, 
          createdBy: { id: userId } 
        } 
      },
      updateData
    );

    return this.findOne(id, projectId, userId);
  }

  async remove(id: number, projectId: number, userId: number): Promise<void> {
    const result = await this.tasksRepository.delete({ 
      id, 
      project: { 
        id: projectId, 
        createdBy: { id: userId } 
      } 
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
} 