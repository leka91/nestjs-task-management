import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from './enum/task-status.enum';
import { v7 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  deleteTaskById(id: string): void {
    const foundTask: Task = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task: Task = this.getTaskById(id);
    const { status } = updateTaskDto;

    task.status = TaskStatus[status];

    return task;
  }
}
