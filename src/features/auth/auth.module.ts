import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthController } from './api/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from './application/jwt.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
