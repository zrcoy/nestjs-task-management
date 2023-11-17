import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";

import { CreateTaskDTO } from "./create-task.dto";
import { GetTasksFilterDTO } from "./get-tasks-filter.dto";
import { Task, TaskStatus } from "./task.model";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  public constructor(private tasksService: TasksService) {}

  @Get()
  public getTasks(@Query() getTaskFilterDTO: GetTasksFilterDTO): Task[] {
    if (Object.keys(getTaskFilterDTO).length) {
      return this.tasksService.getTasksWithFilters(getTaskFilterDTO);
    } else return this.tasksService.getAllTasks();
  }

  @Post()
  public createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Get("/:id")
  public getTaskById(@Param("id") id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete("/:id")
  public deleteTaskById(@Param("id") id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  @Patch("/:id/status")
  public updateTaskStatusById(
    @Param("id") id: string,
    @Body("status") status: TaskStatus
  ): Task {
    return this.tasksService.updateTaskStatusById(id, status);
  }
}
