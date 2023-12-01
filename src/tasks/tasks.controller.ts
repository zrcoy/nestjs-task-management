import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TASK_MESSAGES, TASK_PARAMS, TASK_ROUTES } from './tasks.const';
import { TasksService } from './tasks.service';

@Controller(TASK_ROUTES.TASK_ROOT)
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController', { timestamp: true });
  public constructor(private tasksService: TasksService) {}

  @Get()
  public getTasks(
    @Query() getTaskFilterDTO: GetTasksFilterDTO,
    @GetUser() user: User
  ): Promise<Task[]> {
    this.logger.verbose(
      TASK_MESSAGES.verbose.GETTING_TASKS(
        user.username,
        JSON.stringify(getTaskFilterDTO)
      )
    );
    return this.tasksService.getTasks(getTaskFilterDTO, user);
  }

  @Post()
  public createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User
  ): Promise<Task> {
    this.logger.verbose(
      TASK_MESSAGES.verbose.CREATING_TASK(
        user.username,
        JSON.stringify(createTaskDTO)
      )
    );
    return this.tasksService.createTask(createTaskDTO, user);
  }

  @Get(TASK_ROUTES.TASK_ID)
  public getTaskById(
    @Param(TASK_PARAMS.ID) id: string,
    @GetUser() user: User
  ): Promise<Task> {
    this.logger.verbose(
      TASK_MESSAGES.verbose.GETTING_TASK_BY_ID(id, user.username)
    );
    return this.tasksService.getTaskById(id, user);
  }

  @Delete(TASK_ROUTES.TASK_ID)
  public deleteTaskById(
    @Param(TASK_PARAMS.ID) id: string,
    @GetUser() user: User
  ): Promise<void> {
    this.logger.verbose(
      TASK_MESSAGES.verbose.DELETE_TASK_BY_ID(id, user.username)
    );
    return this.tasksService.deleteTaskById(id, user);
  }

  @Patch(TASK_ROUTES.TASK_UPDATE_STATUS)
  public updateTaskStatusById(
    @Param(TASK_PARAMS.ID) id: string,
    @Body() updateStatusDTO: UpdateTaskStatusDTO,
    @GetUser() user: User
  ): Promise<Task> {
    this.logger.verbose(
      TASK_MESSAGES.verbose.UPDATE_TASK_STATUS(
        id,
        user.username,
        JSON.stringify(updateStatusDTO)
      )
    );
    return this.tasksService.updateTaskStatusById(id, updateStatusDTO, user);
  }
}
