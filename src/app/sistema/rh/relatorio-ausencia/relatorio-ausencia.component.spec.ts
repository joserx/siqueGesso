import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioAusenciaComponent } from './relatorio-ausencia.component';

describe('RelatorioAusenciaComponent', () => {
  let component: RelatorioAusenciaComponent;
  let fixture: ComponentFixture<RelatorioAusenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioAusenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioAusenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
