import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarExpedienteComponent } from './actualizar-expediente.component';

describe('ActualizarExpedienteComponent', () => {
  let component: ActualizarExpedienteComponent;
  let fixture: ComponentFixture<ActualizarExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarExpedienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
