import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    taskId: number,
    userId: number,
  ): Promise<Comment> {
    const comment = this.commentsRepository.create({
      ...createCommentDto,
      task: { id: taskId },
      user: { id: userId },
    });
    return this.commentsRepository.save(comment);
  }

  async findAll(taskId: number): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { task: { id: taskId } },
      relations: ['user'],
    });
  }

  async findOne(id: number, taskId: number): Promise<Comment | null> {
  return this.commentsRepository.findOne({
    where: { id, task: { id: taskId } },
    relations: ['user'],
  });
}

  async remove(id: number, taskId: number): Promise<void> {
    await this.commentsRepository.delete({ id, task: { id: taskId } });
  }
} 