import { Module } from '@nestjs/common';
import { LearningModulesController } from './learning-modules.controller';
import { LearningModulesService } from './learning-modules.service';

@Module({
  controllers: [LearningModulesController],
  providers: [LearningModulesService]
})
export class LearningModulesModule {}
