import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';
import { TaskStatus } from '../../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @IsNumber()
  @IsOptional()
  assignedToId?: number;
} 