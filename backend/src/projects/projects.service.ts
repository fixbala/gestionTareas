import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common'; 

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: number): Promise<Project> {
    const project = this.projectsRepository.create({
      ...createProjectDto,
      createdBy: { id: userId },
    });
    return this.projectsRepository.save(project);
  }

  async findAll(userId: number): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { createdBy: { id: userId } },
      relations: ['createdBy', 'tasks'],
    });
  }

  async findOne(id: number, userId: number): Promise<Project> {
  const project = await this.projectsRepository.findOne({
    where: { id, createdBy: { id: userId } },
    relations: ['createdBy', 'tasks', 'tasks.assignedTo'],
  });
  
  if (!project) {
    throw new NotFoundException(`Project with ID ${id} not found`);
  }
  
  return project;
} 

  async update(id: number, updateProjectDto: Partial<CreateProjectDto>, userId: number): Promise<Project> {
  await this.projectsRepository.update(
    { id, createdBy: { id: userId } },
    updateProjectDto,
  );
  
  const updatedProject = await this.projectsRepository.findOne({
    where: { id, createdBy: { id: userId } },
  });
  
  if (!updatedProject) {
    throw new NotFoundException(`Project with ID ${id} not found after update`);
  }
  
  return updatedProject;
} 

  async remove(id: number, userId: number): Promise<void> {
    await this.projectsRepository.delete({ id, createdBy: { id: userId } });
  }
} 