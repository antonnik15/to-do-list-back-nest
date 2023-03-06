import { Injectable } from '@nestjs/common';
import { TestingRepository } from '../infrastructure/testing.repository';

@Injectable()
export class TestingService {
  constructor(private readonly testingRepository: TestingRepository) {}
  wipeAllData() {
    return this.testingRepository.deleteAllData();
  }
}
