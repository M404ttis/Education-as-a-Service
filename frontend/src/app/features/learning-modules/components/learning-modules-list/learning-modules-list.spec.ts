import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningModulesList } from './learning-modules-list';

describe('LearningModulesList', () => {
  let component: LearningModulesList;
  let fixture: ComponentFixture<LearningModulesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningModulesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningModulesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
