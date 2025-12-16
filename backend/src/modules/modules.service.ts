import { Injectable } from '@nestjs/common';
import { LearningModule, ModuleStats } from '../../../shared/src';
import { ModulesRepository } from './modules.repository';

// NOTE: Service (Business Logic Layer)

@Injectable()
export class ModulesService {
  constructor(private readonly repository: ModulesRepository) { }

  getAllModules(): LearningModule[] {
    return this.repository.findAll();
  }

  getModuleById(id: string): LearningModule | null {
    return this.repository.findById(id);
  }

  updateModuleCompleted(
    id: string,
    completed: boolean,
  ): LearningModule | null {
    const module = this.repository.findById(id);
    if (!module) {
      return null;
    }

    const updatedModule: LearningModule = {
      ...module,
      completed,
    };

    return this.repository.update(id, updatedModule);
  }

  toggleModuleCompleted(id: string): LearningModule | null {
    const module = this.repository.findById(id);
    if (!module) {
      return null;
    }

    const updatedModule: LearningModule = {
      ...module,
      completed: !module.completed,
    };

    return this.repository.update(id, updatedModule);
  }

  calculateTotalModules(modules: LearningModule[]): number {
    return modules.length;
  }

  calculateCompletedCount(modules: LearningModule[]): number {
    return modules.filter((m) => m.completed).length;
  }

  calculateCompletionPercentage(
    completed: number,
    total: number,
  ): number {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  }

  getStatistics(): ModuleStats {
    const modules = this.repository.findAll();
    const total = this.calculateTotalModules(modules);
    const completed = this.calculateCompletedCount(modules);
    const percentage = this.calculateCompletionPercentage(completed, total);

    return {
      totalModules: total,
      completedModules: completed,
      completionPercentage: percentage,
    };
  }
}
