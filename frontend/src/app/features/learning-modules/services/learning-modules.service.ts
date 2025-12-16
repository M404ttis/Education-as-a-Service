import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { LearningModule, ModuleStats, UpdateModuleDto } from '@myapp/learning-module.interface';

@Injectable({
  providedIn: 'root',
})
export class LearningModulesService {
  private apiUrl = 'http://localhost:3000/api/modules';

  // Public signals - exposed to components
  modules = signal<LearningModule[]>([]);
  stats = signal<ModuleStats | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) { }

  // Load all modules from backend
  loadModules(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<LearningModule[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.modules.set(data);
        this.loading.set(false);
        this.loadStats(); // Load stats after modules
      },
      error: (err) => {
        this.error.set('Failed to load learning modules');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  // Load statistics from backend
  loadStats(): void {
    this.http.get<ModuleStats>(`${this.apiUrl}/stats`).subscribe({
      next: (data) => {
        this.stats.set(data);
      },
      error: (err) => {
        console.error('Failed to load stats:', err);
      },
    });
  }

  // Update a module (set completed status)
  updateModule(id: string, completed: boolean): void {
    const dto: UpdateModuleDto = { completed };

    this.http.patch<LearningModule>(`${this.apiUrl}/${id}`, dto).subscribe({
      next: (updated) => {
        // Update the modules signal with the new data
        const current = this.modules();
        const index = current.findIndex((m) => m.id === updated.id);
        if (index > -1) {
          const newModules = [...current];
          newModules[index] = updated;
          this.modules.set(newModules);
        }
        this.loadStats(); // Reload stats after update
      },
      error: (err) => {
        this.error.set('Failed to update learning module');
        console.error(err);
      },
    });
  }
}
