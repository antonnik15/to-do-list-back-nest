import { Module } from '@nestjs/common';
import { TestingController } from './api/testing.controller';
import { TestingRepository } from './infrastructure/testing.repository';
import { UserModule } from '../user/user.module';
import { TestingService } from './application/testing.service';
import { ToDoModule } from '../to-do/to-do.module';

@Module({
  imports: [UserModule, ToDoModule],
  controllers: [TestingController],
  providers: [TestingRepository, TestingService],
})
export class TestingModule {}
