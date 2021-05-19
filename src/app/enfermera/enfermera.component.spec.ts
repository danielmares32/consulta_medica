import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfermeraComponent } from './enfermera.component';

describe('EnfermeraComponent', () => {
  let component: EnfermeraComponent;
  let fixture: ComponentFixture<EnfermeraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnfermeraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfermeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
