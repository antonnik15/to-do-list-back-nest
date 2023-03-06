import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../domain/entities/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserQueryRepository {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}
  findUserByEmail(email: string) {
    return this.UserModel.findOne({ email });
  }

  async findAllUsers() {
    const users = await this.UserModel.find({});
    return users.map((u) => ({ id: u.id, email: u.email }));
  }
}
