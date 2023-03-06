import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../user/domain/entities/user.schema';
import { Model } from 'mongoose';
import { ToDo, ToDoDocument } from '../../to-do/domain/entities/todo.shema';

@Injectable()
export class TestingRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(ToDo.name) private readonly toDoModel: Model<ToDoDocument>,
  ) {}
  async deleteAllData() {
    try {
      await this.userModel.deleteMany({});
      await this.toDoModel.deleteMany({});
    } catch (err) {
      return false;
    }
  }
}
