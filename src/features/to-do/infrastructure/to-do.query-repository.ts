import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ToDo, ToDoDocument } from '../domain/entities/todo.shema';
import { Model } from 'mongoose';

@Injectable()
export class ToDoQueryRepository {
  constructor(
    @InjectModel(ToDo.name) private readonly toDoModel: Model<ToDoDocument>,
  ) {}
  findAllTasksForUser(userId: string) {
    return this.toDoModel.find({ userId });
  }

  findTaskById(id: string) {
    return this.toDoModel.findOne({ id });
  }

  findAllTasks() {
    return this.toDoModel.find({});
  }
}
