import { Module } from '@nestjs/common';
import { ToDoController } from './api/to-do.controller';
import { ToDoService } from './application/to-do.service';
import { ToDoRepository } from './infrastructure/to-do.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDo, ToDoSchema } from './domain/entities/todo.shema';
import { ToDoQueryRepository } from './infrastructure/to-do.query-repository';

const schema = [{ name: ToDo.name, schema: ToDoSchema }];
const ToDoModel = MongooseModule.forFeature(schema);

@Module({
  imports: [ToDoModel],
  controllers: [ToDoController],
  providers: [ToDoService, ToDoRepository, ToDoQueryRepository],
  exports: [ToDoModel],
})
export class ToDoModule {}
