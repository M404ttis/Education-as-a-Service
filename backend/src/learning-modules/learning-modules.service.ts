import { Injectable } from '@nestjs/common';
import { LearningModule } from './learning-module.interface';

@Injectable()
export class LearningModulesService {
  // In-memory storage
  private modules: LearningModule[] = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      category: 'AI',
      estimatedMinutes: 45,
      completed: false,
    },
    {
      id: '2',
      title: 'Climate Change Basics',
      category: 'Sustainability',
      estimatedMinutes: 30,
      completed: true,
    },
    {
      id: '3',
      title: 'Web Development Fundamentals',
      category: 'Digital Skills',
      estimatedMinutes: 60,
      completed: false,
    },
    {
      id: '4',
      title: 'Renewable Energy Solutions',
      category: 'Sustainability',
      estimatedMinutes: 50,
      completed: true,
    },
    {
      id: '5',
      title: 'Solar Power',
      category: 'Sustainability',
      estimatedMinutes: 55,
      completed: true,
    },
    {
      id: '6',
      title: 'Volcano Radiator',
      category: 'Sustainability',
      estimatedMinutes: 65,
      completed: true,
    },
    {
      id: '7',
      title: 'White Board Drawing like a PRO',
      category: 'Digital Skills',
      estimatedMinutes: 5,
      completed: true,
    },
    {
      id: '8',
      title: 'CSS',
      category: 'Digital Skills',
      estimatedMinutes: 75,
      completed: true,
    },
  ];

  // Business logic: get all modules
  getAllModules(): LearningModule[] {
    return this.modules;
  }

  // Business logic: get a single module by ID
  getModuleById(id: string): LearningModule | undefined {
    return this.modules.find((module) => module.id === id);
  }

  // Business logic: update the completed status
  updateModuleCompleted(id: string, completed: boolean): LearningModule | null {
    const module = this.modules.find((m) => m.id === id);
    if (!module) {
      return null;
    }
    module.completed = completed;
    return module;
  }

  // Business logic: toggle the completed status
  toggleModuleCompleted(id: string): LearningModule | null {
    const module = this.modules.find((m) => m.id === id);
    if (!module) {
      return null;
    }
    module.completed = !module.completed;
    return module;
  }

  // Business logic: calculate total number of modules
  getTotalModules(): number {
    return this.modules.length;
  }

  // Business logic: calculate number of completed modules
  getCompletedCount(): number {
    return this.modules.filter((m) => m.completed).length;
  }

  // Business logic: calculate completion percentage
  getCompletionPercentage(): number {
    const total = this.getTotalModules();
    if (total === 0) return 0;
    const completed = this.getCompletedCount();
    return Math.round((completed / total) * 100);
  }

  // Business logic: get statistics object
  getStatistics() {
    return {
      totalModules: this.getTotalModules(),
      completedModules: this.getCompletedCount(),
      completionPercentage: this.getCompletionPercentage(),
    };
  }
}
