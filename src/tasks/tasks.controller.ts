import { Controller, Get } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  public constructor(private tasksService: TasksService) {}

  @Get()
  public getAllTasks() {
    return this.tasksService.getAllTasks();
  }
}
