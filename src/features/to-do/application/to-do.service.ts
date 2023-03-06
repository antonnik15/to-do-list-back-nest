import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToDoDto } from '../api/dto/create-to-do.dto';
import { ToDoRepository } from '../infrastructure/to-do.repository';
import { ToDoQueryRepository } from '../infrastructure/to-do.query-repository';
import { ToDo } from '../domain/entities/todo.shema';
import { UpdateToDoDto } from '../api/dto/update-to-do.dto';

@Injectable()
export class ToDoService {
  constructor(
    private readonly toDoRepository: ToDoRepository,
    private readonly toDoQueryRepository: ToDoQueryRepository,
  ) {}
  createTask(dto: CreateToDoDto) {
    return this.toDoRepository.createTask(dto);
  }

  deleteTaskById(id: string) {
    const task = this.toDoQueryRepository.findTaskById(id);
    if (!task) throw new NotFoundException('Task not found!');
    return this.toDoRepository.deleteTaskById(id);
  }

  async updateCompleteStatus(id: string) {
    const task = await this.toDoQueryRepository.findTaskById(id);
    task.completedStatus = !task.completedStatus;
    return await task.save();
  }

  async updateImportantStatus(id: string) {
    const task = await this.toDoQueryRepository.findTaskById(id);
    task.importantStatus = !task.importantStatus;
    return await task.save();
  }

  async updateTaskById(id: string, text: string) {
    await this.toDoRepository.updateTaskById(id, text);
    return;
  }
}
