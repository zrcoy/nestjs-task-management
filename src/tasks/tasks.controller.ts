import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  public constructor(private tasksService: TasksService) {}

  @Get()
  public getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }
}
