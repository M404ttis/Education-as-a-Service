import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LearningModulesService } from '../../services/learning-modules.service';

@Component({
  selector: 'app-learning-modules-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './learning-modules-list.html',
  styleUrl: './learning-modules-list.css'
})

export class LearningModulesListComponent implements OnInit {
  service = inject(LearningModulesService);

  ngOnInit() {
    this.service.loadStatistics();
  }
}
