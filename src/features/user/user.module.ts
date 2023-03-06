import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserQueryRepository } from './infrastructure/user-query-repository';
import { UserRepository } from './infrastructure/user.repository';
import { User, UserSchema } from './domain/entities/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './api/user.controller';

const schema = [{ name: User.name, schema: UserSchema }];
const UserModel = MongooseModule.forFeature(schema);

@Module({
  imports: [UserModel],
  controllers: [UserController],
  providers: [UserService, UserQueryRepository, UserRepository],
  exports: [UserService, UserQueryRepository, UserModel],
})
export class UserModule {}
