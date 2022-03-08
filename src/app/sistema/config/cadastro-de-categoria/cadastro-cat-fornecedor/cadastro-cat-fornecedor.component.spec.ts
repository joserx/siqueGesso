import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCatFornecedorComponent } from './cadastro-cat-fornecedor.component';

describe('CadastroCatFornecedorComponent', () => {
  let component: CadastroCatFornecedorComponent;
  let fixture: ComponentFixture<CadastroCatFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroCatFornecedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCatFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
