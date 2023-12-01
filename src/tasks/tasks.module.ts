import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
