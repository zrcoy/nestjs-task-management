import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  // public getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // public getTasksWithFilters(getTaskFilterDTO: GetTasksFilterDTO): Task[] {
  //   const { status, search } = getTaskFilterDTO;
  //   let tasks: Task[] = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search)
  //     );
  //   }
  //   return tasks;
  // }

  public async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO);
  }

  public async getTaskById(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  // public deleteTaskById(id: string): void {
  //   const result = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== result.id);
  // }

  public deleteTaskById(id: string): Promise<void> {
    return this.taskRepository.deleteTaskById(id);
  }

  // public updateTaskStatusById(
  //   id: string,
  //   updateStatusDTO: UpdateTaskStatusDTO
  // ): Task {
  //   const { status } = updateStatusDTO;
  //   const task: Task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
