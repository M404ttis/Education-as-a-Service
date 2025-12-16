import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningModulesService } from '../../services/learning-modules.service';
import { LearningModule } from '@myapp/learning-module.interface';

@Component({
  selector: 'app-learning-modules-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-modules-list.html',
  styleUrls: ['./learning-modules-list.css'],
})
export class LearningModulesListComponent implements OnInit {
  private learningModulesService = inject(LearningModulesService);  // Access signals from service

  modules = this.learningModulesService.modules;
  stats = this.learningModulesService.stats;
  loading = this.learningModulesService.loading;
  error = this.learningModulesService.error;

  // Computed signals
  completionPercentage = computed(
    () => this.stats()?.completionPercentage ?? 0
  );
  completedCount = computed(() => this.stats()?.completedModules ?? 0);
  totalCount = computed(() => this.stats()?.totalModules ?? 0);

  constructor() { }

  ngOnInit() {
    this.learningModulesService.loadModules();
  }

  toggleCompleted(module: LearningModule) {
    this.learningModulesService.updateModule(
      module.id,
      !module.completed
    );
  }
}
