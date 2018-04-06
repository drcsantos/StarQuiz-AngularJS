import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultViewComponent } from './quiz-result-view.component';

describe('QuizResultViewComponent', () => {
  let component: QuizResultViewComponent;
  let fixture: ComponentFixture<QuizResultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizResultViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
