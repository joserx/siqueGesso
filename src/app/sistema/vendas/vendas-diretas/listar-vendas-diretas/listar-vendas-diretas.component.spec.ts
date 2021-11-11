import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVendasDiretasComponent } from './listar-vendas-diretas.component';

describe('ListarVendasDiretasComponent', () => {
  let component: ListarVendasDiretasComponent;
  let fixture: ComponentFixture<ListarVendasDiretasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVendasDiretasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVendasDiretasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
