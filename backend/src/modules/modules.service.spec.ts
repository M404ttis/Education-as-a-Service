import { Test, TestingModule } from '@nestjs/testing';
import { ModulesService } from './modules.service';
import { ModulesRepository } from './modules.repository';
import { LearningModule } from '../../../shared/src';

describe('ModulesService (Business Logic)', () => {
  let service: ModulesService;
  let repository: ModulesRepository;
  let mockModules: LearningModule[];

  beforeEach(async () => {
    // Reset mock data for each test
    mockModules = [
      {
        id: '1',
        title: 'Machine Learning Basics',
        category: 'AI',
        estimatedMinutes: 45,
        completed: false,
      },
      {
        id: '2',
        title: 'Climate Change',
        category: 'Sustainability',
        estimatedMinutes: 30,
        completed: true,
      },
      {
        id: '3',
        title: 'Web Development',
        category: 'Digital Skills',
        estimatedMinutes: 60,
        completed: false,
      },
    ];

    // Create a testing module with mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModulesService,
        {
          provide: ModulesRepository,
          useValue: {
            findAll: jest.fn(() => mockModules),
            findById: jest.fn((id: string) =>
              mockModules.find((m) => m.id === id) || null,
            ),
            update: jest.fn((id: string, updatedModule: LearningModule) => {
              const index = mockModules.findIndex((m) => m.id === id);
              if (index === -1) return null;
              mockModules[index] = { ...updatedModule };
              return mockModules[index];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ModulesService>(ModulesService);
    repository = module.get<ModulesRepository>(ModulesRepository);
  });

  describe('getAllModules', () => {
    it('should return all modules from repository', () => {
      const result = service.getAllModules();

      expect(result.length).toBe(3);
      expect(result[0].id).toBe('1');
      expect(repository.findAll).toHaveBeenCalled();
    });

    it('should return an array', () => {
      const result = service.getAllModules();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getModuleById', () => {
    it('should return a module by id', () => {
      const result = service.getModuleById('1');

      expect(result).not.toBeNull();
      expect(result?.id).toBe('1');
      expect(result?.title).toBe('Machine Learning Basics');
    });

    it('should return null if module not found', () => {
      const result = service.getModuleById('999');

      expect(result).toBeNull();
    });
  });

  describe('updateModuleCompleted', () => {
    it('should update module completion status to true', () => {
      const result = service.updateModuleCompleted('1', true);

      expect(result).not.toBeNull();
      expect(result?.completed).toBe(true);
    });

    it('should update module completion status to false', () => {
      const result = service.updateModuleCompleted('2', false);

      expect(result).not.toBeNull();
      expect(result?.completed).toBe(false);
    });

    it('should return null if module not found', () => {
      const result = service.updateModuleCompleted('999', true);

      expect(result).toBeNull();
    });

    it('should preserve other module properties when updating', () => {
      const result = service.updateModuleCompleted('1', true);

      expect(result?.id).toBe('1');
      expect(result?.title).toBe('Machine Learning Basics');
      expect(result?.category).toBe('AI');
      expect(result?.estimatedMinutes).toBe(45);
    });
  });

  describe('toggleModuleCompleted', () => {
    it('should toggle module from false to true', () => {
      const result = service.toggleModuleCompleted('1');

      expect(result?.completed).toBe(true);
    });

    it('should toggle module from true to false', () => {
      const result = service.toggleModuleCompleted('2');

      expect(result?.completed).toBe(false);
    });

    it('should return null if module not found', () => {
      const result = service.toggleModuleCompleted('999');

      expect(result).toBeNull();
    });
  });

  describe('getCompletionPercentage', () => {
    it('should calculate completion percentage from all modules', () => {
      const result = service.getCompletionPercentage();

      expect(result).toBe(33); // 1 out of 3 modules completed
    });

    it('should return 0 when no modules exist', () => {
      mockModules.length = 0;

      const result = service.getCompletionPercentage();

      expect(result).toBe(0);
    });

    it('should return 0 when all modules are incomplete', () => {
      mockModules.forEach((m) => (m.completed = false));

      const result = service.getCompletionPercentage();

      expect(result).toBe(0);
    });

    it('should return 100 when all modules are complete', () => {
      mockModules.forEach((m) => (m.completed = true));

      const result = service.getCompletionPercentage();

      expect(result).toBe(100);
    });

    it('should return 50 when half modules are complete', () => {
      mockModules[2].completed = true; // Now 2 out of 3 are complete

      const result = service.getCompletionPercentage();

      expect(result).toBe(67); // 2/3 = 66.666... rounded to 67
    });
  });

  describe('getStatistics', () => {
    it('should return statistics object with all fields', () => {
      const result = service.getStatistics();

      expect(result).toHaveProperty('totalModules');
      expect(result).toHaveProperty('completedModules');
      expect(result).toHaveProperty('completionPercentage');
    });

    it('should calculate correct statistics', () => {
      const result = service.getStatistics();

      expect(result.totalModules).toBe(3);
      expect(result.completedModules).toBe(1);
      expect(result.completionPercentage).toBe(33); // 1/3 = 33%
    });

    it('should update statistics after module completion changes', () => {
      service.updateModuleCompleted('1', true);
      const result = service.getStatistics();

      expect(result.completedModules).toBe(2);
      expect(result.completionPercentage).toBe(67); // 2/3 = 66.666... rounded to 67
    });

    it('should return 0 percentage when no modules exist', () => {
      mockModules.length = 0;

      const result = service.getStatistics();

      expect(result.totalModules).toBe(0);
      expect(result.completedModules).toBe(0);
      expect(result.completionPercentage).toBe(0);
    });

    it('should return 100 percentage when all modules complete', () => {
      mockModules.forEach((m) => (m.completed = true));

      const result = service.getStatistics();

      expect(result.totalModules).toBe(3);
      expect(result.completedModules).toBe(3);
      expect(result.completionPercentage).toBe(100);
    });
  });
});
