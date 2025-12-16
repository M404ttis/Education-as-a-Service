import { Test, TestingModule } from '@nestjs/testing';
import { LearningModulesService } from './learning-modules.service';

describe('LearningModulesService', () => {
  let service: LearningModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningModulesService],
    }).compile();

    service = module.get<LearningModulesService>(LearningModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
