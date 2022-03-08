import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaFornecedorComponent } from './categoria-fornecedor.component';

describe('CategoriaFornecedorComponent', () => {
  let component: CategoriaFornecedorComponent;
  let fixture: ComponentFixture<CategoriaFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaFornecedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
