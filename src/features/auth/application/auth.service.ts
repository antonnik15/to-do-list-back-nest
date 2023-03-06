import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/application/user.service';
import { RegistrationDto } from '../api/dto/registration.dto';
import { LoginDto } from '../api/dto/login.dto';
import { UserQueryRepository } from '../../user/infrastructure/user-query-repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userQueryRepository: UserQueryRepository,
    private readonly jwtService: JwtService,
  ) {}
  async registration(dto: RegistrationDto) {
    return this.userService.registerUser(dto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userQueryRepository.findUserByEmail(loginDto.email);
    if (!user)
      throw new UnauthorizedException(
        'User with this email was not found. Please register.',
      );
    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatches)
      throw new UnauthorizedException('Incorrect password. Please try again');

    const token = this.jwtService.generateAccessToken(user.id);
    return { token, userId: user.id };
  }
}
