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
      title: 'Deep Learning Fundamentals',
      category: 'AI',
      estimatedMinutes: 60,
      completed: false,
    },
    {
      id: '3',
      title: 'Natural Language Processing',
      category: 'AI',
      estimatedMinutes: 75,
      completed: false,
    },
    {
      id: '4',
      title: 'Climate Change Basics',
      category: 'Sustainability',
      estimatedMinutes: 30,
      completed: true,
    },
    {
      id: '5',
      title: 'Renewable Energy Solutions',
      category: 'Sustainability',
      estimatedMinutes: 50,
      completed: false,
    },
    {
      id: '6',
      title: 'Sustainable Agriculture',
      category: 'Sustainability',
      estimatedMinutes: 40,
      completed: false,
    },
    {
      id: '7',
      title: 'Web Development Fundamentals',
      category: 'Digital Skills',
      estimatedMinutes: 60,
      completed: false,
    },
    {
      id: '8',
      title: 'Advanced JavaScript',
      category: 'Digital Skills',
      estimatedMinutes: 70,
      completed: true,
    },
    {
      id: '9',
      title: 'React for Beginners',
      category: 'Digital Skills',
      estimatedMinutes: 65,
      completed: false,
    },
    {
      id: '10',
      title: 'TypeScript Essentials',
      category: 'Digital Skills',
      estimatedMinutes: 55,
      completed: false,
    },
    {
      id: '11',
      title: 'Computer Vision Basics',
      category: 'AI',
      estimatedMinutes: 80,
      completed: false,
    },
    {
      id: '12',
      title: 'Reinforcement Learning',
      category: 'AI',
      estimatedMinutes: 90,
      completed: false,
    },
    {
      id: '13',
      title: 'Carbon Footprint Reduction',
      category: 'Sustainability',
      estimatedMinutes: 35,
      completed: false,
    },
    {
      id: '14',
      title: 'Circular Economy',
      category: 'Sustainability',
      estimatedMinutes: 45,
      completed: false,
    },
    {
      id: '15',
      title: 'CSS Grid and Flexbox',
      category: 'Digital Skills',
      estimatedMinutes: 50,
      completed: true,
    },
    {
      id: '16',
      title: 'Database Design',
      category: 'Digital Skills',
      estimatedMinutes: 75,
      completed: false,
    },
    {
      id: '17',
      title: 'AI Ethics',
      category: 'AI',
      estimatedMinutes: 40,
      completed: false,
    },
    {
      id: '18',
      title: 'Water Conservation',
      category: 'Sustainability',
      estimatedMinutes: 30,
      completed: false,
    },
    {
      id: '19',
      title: 'REST API Design',
      category: 'Digital Skills',
      estimatedMinutes: 65,
      completed: false,
    },
    {
      id: '20',
      title: 'GraphQL for APIs',
      category: 'Digital Skills',
      estimatedMinutes: 70,
      completed: false,
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
