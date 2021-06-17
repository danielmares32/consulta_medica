import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAnalisisComponent } from './registro-analisis.component';

describe('RegistroAnalisisComponent', () => {
  let component: RegistroAnalisisComponent;
  let fixture: ComponentFixture<RegistroAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAnalisisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
