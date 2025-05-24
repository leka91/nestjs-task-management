import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './enum/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    const task: Task = await this.getTaskById(id);

    await this.taskRepository.delete(task);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await this.taskRepository.save(task);

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task: Task = await this.getTaskById(id);
    const { status } = updateTaskDto;

    task.status = TaskStatus[status];

    return task;
  }
}
