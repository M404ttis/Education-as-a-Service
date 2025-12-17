import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LearningModuleType {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  category: string;

  @Field()
  estimatedMinutes: number;

  @Field()
  completed: boolean;
}

@ObjectType()
export class ModuleStatsType {
  @Field()
  totalModules: number;

  @Field()
  completedModules: number;

  @Field()
  completionPercentage: number;
}
