import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarProdutosComponent } from './filtrar-produtos.component';

describe('FiltrarProdutosComponent', () => {
  let component: FiltrarProdutosComponent;
  let fixture: ComponentFixture<FiltrarProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrarProdutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
