import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from '../application/auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  registration(@Body() registrationDto: RegistrationDto) {
    return this.authService.registration(registrationDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
