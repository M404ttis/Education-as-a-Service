import { Test, TestingModule } from '@nestjs/testing';
import { LearningModulesController } from './learning-modules.controller';

describe('LearningModulesController', () => {
  let controller: LearningModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningModulesController],
    }).compile();

    controller = module.get<LearningModulesController>(LearningModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
