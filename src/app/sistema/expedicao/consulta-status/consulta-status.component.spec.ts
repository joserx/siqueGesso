import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaStatusComponent } from './consulta-status.component';

describe('ConsultaStatusComponent', () => {
  let component: ConsultaStatusComponent;
  let fixture: ComponentFixture<ConsultaStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
