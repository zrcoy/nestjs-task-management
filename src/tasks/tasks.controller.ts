import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  public constructor(private tasksService: TasksService) {}

  // @Get()
  // public getTasks(@Query() getTaskFilterDTO: GetTasksFilterDTO): Task[] {
  //   if (Object.keys(getTaskFilterDTO).length) {
  //     return this.tasksService.getTasksWithFilters(getTaskFilterDTO);
  //   } else return this.tasksService.getAllTasks();
  // }

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

  // @Patch('/:id/status')
  // public updateTaskStatusById(
  //   @Param('id') id: string,
  //   @Body() updateStatusDTO: UpdateTaskStatusDTO
  // ): Task {
  //   return this.tasksService.updateTaskStatusById(id, updateStatusDTO);
  // }
}
