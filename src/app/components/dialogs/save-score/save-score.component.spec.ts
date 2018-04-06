import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveScoreComponent } from './save-score.component';

describe('SaveScoreComponent', () => {
  let component: SaveScoreComponent;
  let fixture: ComponentFixture<SaveScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
