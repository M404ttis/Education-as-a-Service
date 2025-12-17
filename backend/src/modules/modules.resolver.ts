import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { LearningModuleType, ModuleStatsType } from './dto/learning-module.type';

@Resolver(() => LearningModuleType)
export class ModulesResolver {
  constructor(private readonly modulesService: ModulesService) { }

  @Query(() => [LearningModuleType], {
    description: 'Get all learning modules, optionally filtered by search term and/or category',
  })
  modules(
    @Args('searchTerm', { nullable: true })
    searchTerm?: string,
    @Args('category', { nullable: true })
    category?: string,
  ): LearningModuleType[] {
    return this.modulesService.searchModules(searchTerm, category);
  }

  @Query(() => LearningModuleType, { nullable: true })
  module(@Args('id') id: string): LearningModuleType | null {
    return this.modulesService.getModuleById(id);
  }

  @Query(() => ModuleStatsType)
  moduleStats(): ModuleStatsType {
    return this.modulesService.getStatistics();
  }

  @Mutation(() => LearningModuleType)
  updateModuleCompleted(
    @Args('id') id: string,
    @Args('completed') completed: boolean,
  ): LearningModuleType {
    const result = this.modulesService.updateModuleCompleted(id, completed);
    if (!result) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    return result;
  }

  @Mutation(() => LearningModuleType)
  toggleModuleCompleted(@Args('id') id: string): LearningModuleType {
    const result = this.modulesService.toggleModuleCompleted(id);
    if (!result) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    return result;
  }
}
