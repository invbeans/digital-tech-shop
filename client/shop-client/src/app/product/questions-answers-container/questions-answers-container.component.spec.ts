import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAnswersContainerComponent } from './questions-answers-container.component';

describe('QuestionsAnswersContainerComponent', () => {
  let component: QuestionsAnswersContainerComponent;
  let fixture: ComponentFixture<QuestionsAnswersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsAnswersContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsAnswersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
