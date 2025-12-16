export interface LearningModule {
  id: string;
  title: string;
  category: 'AI' | 'Sustainability' | 'Digital Skills';
  estimatedMinutes: number;
  completed: boolean;
}
