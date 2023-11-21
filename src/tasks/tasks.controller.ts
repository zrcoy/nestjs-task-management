import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';

import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  public constructor(private readonly tasksService: TasksService) {}

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

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  public deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  public updateTaskStatusById(
    @Param('id') id: string,
    @Body() updateStatusDTO: UpdateTaskStatusDTO
  ): Promise<Task> {
    return this.tasksService.updateTaskStatusById(id, updateStatusDTO);
  }
}
