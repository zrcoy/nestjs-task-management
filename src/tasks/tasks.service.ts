import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TASK_MESSAGES } from './tasks.const';

@Injectable()
export class TasksService {
  private logger = new Logger('TasksService', { timestamp: true });
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
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` }
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        TASK_MESSAGES.error.FAILED_TO_GET_TASKS(
          user.username,
          JSON.stringify(filterDto)
        ),
        error.stack
      );
      throw new InternalServerErrorException();
    }
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

    try {
      await this.taskRepository.save(task);
      return task;
    } catch (error) {
      this.logger.error(
        TASK_MESSAGES.error.FAILED_TO_CREATE_TASK(
          user.username,
          JSON.stringify(createTaskDTO)
        ),
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }

  public async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, user }
    });
    if (!found) {
      throw new NotFoundException(TASK_MESSAGES.error.TASK_NOT_FOUND(id));
    }
    return found;
  }

  public async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(TASK_MESSAGES.error.TASK_NOT_FOUND(id));
    }
  }

  public async updateTaskStatusById(
    id: string,
    updateStatusDTO: UpdateTaskStatusDTO,
    user: User
  ): Promise<Task> {
    const { status } = updateStatusDTO;
    const task = await this.getTaskById(id, user);
    task.status = status;
    try {
      await this.taskRepository.save(task);
      return task;
    } catch (error) {
      this.logger.error(
        TASK_MESSAGES.error.FAILED_TO_UPDATE_TASK(id, user.username, status),
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }
}
