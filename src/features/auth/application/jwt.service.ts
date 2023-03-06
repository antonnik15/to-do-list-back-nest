import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  private readonly accessTokenSecret =
    this.configService.get('JWT_ACCESS_SECRET');

  generateAccessToken(id: string) {
    const accessToken = jwt.sign({ id }, this.accessTokenSecret, {
      expiresIn: '1h',
    });

    return accessToken;
  }
}
