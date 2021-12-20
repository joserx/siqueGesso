import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarVendasDiretasComponent } from './visualizar-vendas-diretas.component';

describe('VisualizarVendasDiretasComponent', () => {
  let component: VisualizarVendasDiretasComponent;
  let fixture: ComponentFixture<VisualizarVendasDiretasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarVendasDiretasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarVendasDiretasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
