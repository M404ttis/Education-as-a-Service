export interface LearningModule {
	id: string;
	title: string;
	category: 'AI' | 'Sustainability' | 'Digital Skills';
	estimatedMinutes: number;
	completed: boolean;
}

export interface ModuleStats {
	totalModules: number;
	completedModules: number;
	completionPercentage: number;
}

export interface UpdateModuleDto {
	completed?: boolean;
}
