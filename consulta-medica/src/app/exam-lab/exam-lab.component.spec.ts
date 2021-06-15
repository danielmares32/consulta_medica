import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamLabComponent } from './exam-lab.component';

describe('ExamLabComponent', () => {
  let component: ExamLabComponent;
  let fixture: ComponentFixture<ExamLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
