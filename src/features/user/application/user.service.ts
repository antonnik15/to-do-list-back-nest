import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserQueryRepository } from '../infrastructure/user-query-repository';
import { RegistrationDto } from '../../auth/api/dto/registration.dto';
import { UserRepository } from '../infrastructure/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userQueryRepository: UserQueryRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async registerUser(dto: RegistrationDto) {
    const user = await this.userQueryRepository.findUserByEmail(dto.email);
    if (user) throw new BadRequestException('user already exist!');
    const passwordHash = this.generatePasswordHash(dto.password);
    dto.password = await passwordHash;
    const newUser = await this.userRepository.createUser(dto);
    return { userId: newUser.id };
  }

  generatePasswordHash(password: string) {
    return bcrypt.hash(password, 10);
  }
}
