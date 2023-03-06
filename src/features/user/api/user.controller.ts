import { Controller, Get } from '@nestjs/common';
import { UserQueryRepository } from '../infrastructure/user-query-repository';

@Controller('users')
export class UserController {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}
  @Get()
  getAllUsers() {
    return this.userQueryRepository.findAllUsers();
  }
}
