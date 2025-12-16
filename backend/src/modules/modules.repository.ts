import { Injectable } from '@nestjs/common';
import { LearningModule } from '../../../shared/src';

// NOTE: Repository (Data Access Layer)

@Injectable()
export class ModulesRepository {
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
  ];

  findAll(): LearningModule[] {
    return this.modules;
  }

  findById(id: string): LearningModule | null {
    return this.modules.find((m) => m.id === id) || null;
  }

  update(id: string, module: LearningModule): LearningModule | null {
    const index = this.modules.findIndex((m) => m.id === id);
    if (index === -1) {
      return null;
    }
    this.modules[index] = module;
    return this.modules[index];
  }
}
