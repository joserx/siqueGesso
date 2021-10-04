import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AusenciaComponent } from './ausencia.component';

describe('AusenciaComponent', () => {
  let component: AusenciaComponent;
  let fixture: ComponentFixture<AusenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AusenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AusenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
