import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LearningModule, ModuleStats } from '@myapp/learning-module.interface';

@Injectable({ providedIn: 'root' })
export class LearningModulesService {
  private http = inject(HttpClient);
  private restApiUrl = 'http://localhost:3000/api/modules';
  private graphqlUrl = 'http://localhost:3000/graphql';

  // State signals
  modules = signal<LearningModule[]>([]);
  stats = signal<ModuleStats | null>(null);
  loading = signal(false);
  searchTerm = signal('');
  selectedCategory = signal('');
  error = signal<string | null>(null);

  constructor() {
    // Auto-fetch when search or category changes
    effect(() => {
      this.searchTerm();
      this.selectedCategory();
      this.fetchModules();
    });
  }

  private fetchModules() {
    this.loading.set(true);
    this.error.set(null);

    // ===== REST VERSION =====
    let params = new HttpParams();
    if (this.searchTerm()?.trim()) {
      params = params.set('search', this.searchTerm());
    }
    if (this.selectedCategory()?.trim()) {
      params = params.set('category', this.selectedCategory());
    }

    this.http.get<LearningModule[]>(this.restApiUrl, { params }).subscribe({
      next: (data) => {
        this.modules.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load modules');
        this.loading.set(false);
      }
    });

    // ===== GRAPHQL VERSION  =====
    /*
    const query = `
      query GetModules($searchTerm: String, $category: String) {
        modules(searchTerm: $searchTerm, category: $category) {
          id
          title
          category
          estimatedMinutes
          completed
        }
      }
    `;

    this.http.post<any>(this.graphqlUrl, {
      query,
      variables: {
        searchTerm: this.searchTerm()?.trim() || null,
        category: this.selectedCategory()?.trim() || null
      }
    }).subscribe({
      next: (response) => {
        if (response.errors) {
          this.error.set(response.errors[0].message);
          this.loading.set(false);
          return;
        }
        this.modules.set(response.data.modules);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load modules');
        this.loading.set(false);
      }
    });
    */
  }

  loadStatistics() {
    // ===== REST VERSION =====
    this.http.get<ModuleStats>(`${this.restApiUrl}/stats`).subscribe({
      next: (data) => this.stats.set(data),
      error: (err) => this.error.set('Failed to load statistics')
    });

    // ===== GRAPHQL VERSION  =====
    /*
    const query = `
      query GetStats {
        moduleStats {
          totalModules
          completedModules
          completionPercentage
        }
      }
    `;

    this.http.post<any>(this.graphqlUrl, { query }).subscribe({
      next: (response) => {
        if (response.errors) {
          this.error.set(response.errors[0].message);
          return;
        }
        this.stats.set(response.data.moduleStats);
      },
      error: (err) => this.error.set('Failed to load statistics')
    });
    */
  }

  updateModuleCompleted(id: string, completed: boolean) {
    // ===== REST VERSION =====
    this.http.patch<LearningModule>(
      `${this.restApiUrl}/${id}`,
      { completed }
    ).subscribe({
      next: (updated) => {
        this.modules.update(modules =>
          modules.map(m => m.id === id ? updated : m)
        );
        // Refresh stats after update
        this.loadStatistics();
      },

      error: (err) => this.error.set('Failed to update module')
    });

    // ===== GRAPHQL VERSION  =====
    /*
    const mutation = `
      mutation UpdateModule($id: String!, $completed: Boolean!) {
        updateModuleCompleted(id: $id, completed: $completed) {
          id
          title
          category
          estimatedMinutes
          completed
        }
      }
    `;

    this.http.post<any>(this.graphqlUrl, {
      query: mutation,
      variables: { id, completed }
    }).subscribe({
      next: (response) => {
        if (response.errors) {
          this.error.set(response.errors[0].message);
          return;
        }
        const updated = response.data.updateModuleCompleted;
        this.modules.update(modules =>
          modules.map(m => m.id === id ? updated : m)
        );
      },
      error: (err) => this.error.set('Failed to update module')
    });
    */
  }

  toggleModuleCompleted(id: string) {
    // ===== REST VERSION =====
    this.http.patch<LearningModule>(
      `${this.restApiUrl}/${id}`,
      {}
    ).subscribe({
      next: (updated) => {
        this.modules.update(modules =>
          modules.map(m => m.id === id ? updated : m)
        );
        // Refresh stats after update
        this.loadStatistics();
      },
      error: (err) => this.error.set('Failed to toggle module')
    });

    // ===== GRAPHQL VERSION  =====
    /*
    const mutation = `
      mutation ToggleModule($id: String!) {
        toggleModuleCompleted(id: $id) {
          id
          title
          category
          estimatedMinutes
          completed
        }
      }
    `;

    this.http.post<any>(this.graphqlUrl, {
      query: mutation,
      variables: { id }
    }).subscribe({
      next: (response) => {
        if (response.errors) {
          this.error.set(response.errors[0].message);
          return;
        }
        const updated = response.data.toggleModuleCompleted;
        this.modules.update(modules =>
          modules.map(m => m.id === id ? updated : m)
        );
      },
      error: (err) => this.error.set('Failed to toggle module')
    });
    */
  }

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
