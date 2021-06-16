import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasDisponiblesComponent } from './consultas-disponibles.component';

describe('ConsultasDisponiblesComponent', () => {
  let component: ConsultasDisponiblesComponent;
  let fixture: ComponentFixture<ConsultasDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultasDisponiblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
