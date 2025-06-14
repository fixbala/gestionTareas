import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './task.entity';
import { Comment } from './comment.entity';
import { Project } from './project.entity';
 
export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @OneToMany(() => Task, (task) => task.assignedTo)
  tasks: Task[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Project, (project) => project.createdBy)
  projects: Project[];
} 