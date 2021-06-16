import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HisorialConsultasComponent } from './hisorial-consultas.component';

describe('HisorialConsultasComponent', () => {
  let component: HisorialConsultasComponent;
  let fixture: ComponentFixture<HisorialConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HisorialConsultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HisorialConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
