import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  public getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  public async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO);
  }

  public async getTaskById(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  public deleteTaskById(id: string): Promise<void> {
    return this.taskRepository.deleteTaskById(id);
  }

  public async updateTaskStatusById(
    id: string,
    updateStatusDTO: UpdateTaskStatusDTO
  ): Promise<Task> {
    return this.taskRepository.updateTaskStatusById(id, updateStatusDTO);
  }
}
