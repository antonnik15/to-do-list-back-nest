import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { ToDoService } from '../application/to-do.service';
import { ToDoQueryRepository } from '../infrastructure/to-do.query-repository';
import { UpdateToDoDto } from './dto/update-to-do.dto';

@Controller('todo')
export class ToDoController {
  constructor(
    private readonly toDoService: ToDoService,
    private readonly toDoQueryRepository: ToDoQueryRepository,
  ) {}

  @Post('add')
  createTask(@Body() createToDoDto: CreateToDoDto) {
    return this.toDoService.createTask(createToDoDto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAllTasksForUser(@Query('userId') userId: string) {
    const tasks = await this.toDoQueryRepository.findAllTasksForUser(userId);
    return tasks;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param('id') id: string) {
    const task = await this.toDoService.deleteTaskById(id);
    return task;
  }

  @Put('complete/:id')
  completeTask(@Param('id') id: string) {
    return this.toDoService.updateCompleteStatus(id);
  }

  @Put('important/:id')
  updateImportantStatusTask(@Param('id') id: string) {
    return this.toDoService.updateImportantStatus(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateTask(@Param('id') id: string, @Body() updateToDoDto: UpdateToDoDto) {
    return this.toDoService.updateTaskById(id, updateToDoDto.text);
  }

  @Get('all')
  async findAllTasks() {
    const tasks = await this.toDoQueryRepository.findAllTasks();
    return tasks;
  }
}
