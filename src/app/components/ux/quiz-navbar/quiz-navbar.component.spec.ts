import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizNavbarComponent } from './quiz-navbar.component';

describe('QuizNavbarComponent', () => {
  let component: QuizNavbarComponent;
  let fixture: ComponentFixture<QuizNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
