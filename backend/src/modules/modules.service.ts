import { Injectable } from '@nestjs/common';
import { LearningModule, ModuleStats, UpdateModuleDto } from '../../../shared/src';
import { ModulesRepository } from './modules.repository';

@Injectable()
export class ModulesService {
  constructor(private readonly repository: ModulesRepository) { }

  getAllModules(): LearningModule[] {
    return this.repository.findAll();
  }

  getModuleById(id: string): LearningModule | null {
    return this.repository.findById(id);
  }

  // Search and filter modules
  searchModules(searchTerm?: string, category?: string): LearningModule[] {
    let modules = this.repository.findAll();

    // Filter by search term (title or category)
    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      modules = modules.filter(
        (m) =>
          m.title.toLowerCase().includes(term) ||
          m.category.toLowerCase().includes(term),
      );
    }

    // Filter by category
    if (category && category.trim() !== '') {
      modules = modules.filter(
        (m) => m.category.toLowerCase() === category.toLowerCase(),
      );
    }

    return modules;
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

  getCompletionPercentage(): number {
    const modules = this.repository.findAll();
    const total = modules.length;
    if (total === 0) return 0;
    const completed = modules.filter((m) => m.completed).length;
    return Math.round((completed / total) * 100);
  }

  getStatistics(): ModuleStats {
    const modules = this.repository.findAll();
    const total = modules.length;
    const completed = modules.filter((m) => m.completed).length;
    const completionPercentage =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      totalModules: total,
      completedModules: completed,
      completionPercentage,
    };
  }
}
