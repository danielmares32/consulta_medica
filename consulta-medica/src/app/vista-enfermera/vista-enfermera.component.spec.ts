import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEnfermeraComponent } from './vista-enfermera.component';

describe('VistaEnfermeraComponent', () => {
  let component: VistaEnfermeraComponent;
  let fixture: ComponentFixture<VistaEnfermeraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaEnfermeraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaEnfermeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
