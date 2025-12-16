import { TestBed } from '@angular/core/testing';

import { LearningModules } from './learning-modules';

describe('LearningModules', () => {
  let service: LearningModules;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningModules);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
