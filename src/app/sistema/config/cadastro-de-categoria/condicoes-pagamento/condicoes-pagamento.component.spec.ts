import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicoesPagamentoComponent } from './condicoes-pagamento.component';

describe('CondicoesPagamentoComponent', () => {
  let component: CondicoesPagamentoComponent;
  let fixture: ComponentFixture<CondicoesPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondicoesPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicoesPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
