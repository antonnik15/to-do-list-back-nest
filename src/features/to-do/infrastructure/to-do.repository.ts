import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ToDo, ToDoDocument } from '../domain/entities/todo.shema';
import { Model } from 'mongoose';
import { CreateToDoDto } from '../api/dto/create-to-do.dto';

@Injectable()
export class ToDoRepository {
  constructor(
    @InjectModel(ToDo.name) private readonly toDoModel: Model<ToDoDocument>,
  ) {}
  async createTask(dto: CreateToDoDto) {
    const task = new this.toDoModel(dto);
    return await task.save();
  }

  deleteTaskById(id: string) {
    return this.toDoModel.findOneAndDelete({ id });
  }

  updateTaskById(id: string, text: string) {
    return this.toDoModel.findOneAndUpdate({ id }, { text });
  }
}
