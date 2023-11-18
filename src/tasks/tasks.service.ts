import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksWithFilters(getTaskFilterDTO: GetTasksFilterDTO): Task[] {
    const { status, search } = getTaskFilterDTO;
    let tasks: Task[] = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search)
      );
    }
    return tasks;
  }

  public createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);

    return task;
  }

  public getTaskById(id: string): Task {
    const result = this.tasks.find((task) => task.id === id);
    if (!result) {
      throw new NotFoundException(`Task with ID: ${id} not found.`);
    }
    return result;
  }

  public deleteTaskById(id: string): void {
    const result = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== result.id);
  }

  public updateTaskStatusById(
    id: string,
    updateStatusDTO: UpdateTaskStatusDTO
  ): Task {
    const { status } = updateStatusDTO;
    const task: Task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
