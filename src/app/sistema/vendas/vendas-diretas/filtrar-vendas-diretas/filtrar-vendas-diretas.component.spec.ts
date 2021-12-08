import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarVendasDiretasComponent } from './filtrar-vendas-diretas.component';

describe('FiltrarVendasDiretasComponent', () => {
  let component: FiltrarVendasDiretasComponent;
  let fixture: ComponentFixture<FiltrarVendasDiretasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrarVendasDiretasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarVendasDiretasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
