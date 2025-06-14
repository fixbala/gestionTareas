import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Comment } from './comment.entity';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  assignedTo: User;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
} 