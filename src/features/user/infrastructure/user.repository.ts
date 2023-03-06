import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../domain/entities/user.schema';
import { Model } from 'mongoose';
import { RegistrationDto } from '../../auth/api/dto/registration.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(dto: RegistrationDto) {
    const user = new this.userModel(dto);
    return await user.save();
  }
}
