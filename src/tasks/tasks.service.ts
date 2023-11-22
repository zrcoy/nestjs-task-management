import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TASK_ERROR_MESSAGES } from './tasks.const';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}

  public async getTasks(
    filterDto: GetTasksFilterDTO,
    user: User
  ): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.taskRepository
      .createQueryBuilder('task')
      .where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` }
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  public async createTask(
    createTaskDTO: CreateTaskDTO,
    user: User
  ): Promise<Task> {
    const { title, description } = createTaskDTO;

    const task: Task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });

    await this.taskRepository.save(task);

    return task;
  }

  public async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(TASK_ERROR_MESSAGES.TASK_NOT_FOUND(id));
    }
    return found;
  }

  public async deleteTaskById(id: string): Promise<void> {
    console.log({ id });
    const result = await this.taskRepository.delete(id);
    console.log({ result });
    if (result.affected === 0) {
      throw new NotFoundException(TASK_ERROR_MESSAGES.TASK_NOT_FOUND(id));
    }
  }

  public async updateTaskStatusById(
    id: string,
    updateStatusDTO: UpdateTaskStatusDTO
  ): Promise<Task> {
    const { status } = updateStatusDTO;
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
