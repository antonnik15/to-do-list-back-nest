import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfig } from './config/mongoose.config';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { TestingModule } from './features/testing/testing.module';
import { ToDoModule } from './features/to-do/to-do.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({ useClass: MongooseConfig }),
    UserModule,
    AuthModule,
    TestingModule,
    ToDoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
