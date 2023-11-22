import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TASK_PARAMS, TASK_ROUTES } from './tasks.const';
import { TasksService } from './tasks.service';

@Controller(TASK_ROUTES.TASK_ROOT)
@UseGuards(AuthGuard())
export class TasksController {
  public constructor(private tasksService: TasksService) {}

  @Get()
  public getTasks(
    @Query() getTaskFilterDTO: GetTasksFilterDTO
  ): Promise<Task[]> {
    return this.tasksService.getTasks(getTaskFilterDTO);
  }

  @Post()
  public createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Get(TASK_ROUTES.TASK_ID)
  public getTaskById(@Param(TASK_PARAMS.ID) id: string): Promise<Task> {
    console.log({ idInControllerGet: id });
    return this.tasksService.getTaskById(id);
  }

  @Delete(TASK_ROUTES.TASK_ID)
  public deleteTaskById(@Param(TASK_PARAMS.ID) id: string): Promise<void> {
    console.log({ idInController: id });
    return this.tasksService.deleteTaskById(id);
  }

  @Patch(TASK_ROUTES.TASK_UPDATE_STATUS)
  public updateTaskStatusById(
    @Param(TASK_PARAMS.ID) id: string,
    @Body() updateStatusDTO: UpdateTaskStatusDTO
  ): Promise<Task> {
    return this.tasksService.updateTaskStatusById(id, updateStatusDTO);
  }
}
