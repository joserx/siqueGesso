import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioModalAusenciaComponent } from './relatorio-modal-ausencia.component';

describe('RelatorioModalAusenciaComponent', () => {
  let component: RelatorioModalAusenciaComponent;
  let fixture: ComponentFixture<RelatorioModalAusenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioModalAusenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioModalAusenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
