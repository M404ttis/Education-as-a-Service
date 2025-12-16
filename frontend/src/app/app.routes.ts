import { Routes } from '@angular/router';
import { LearningModulesListComponent } from './features/learning-modules/components/learning-modules-list/learning-modules-list';

export const routes: Routes = [
  {
    path: 'learning-modules',
    component: LearningModulesListComponent,
  },
  {
    path: '',
    redirectTo: 'learning-modules',
    pathMatch: 'full',
  },
];
