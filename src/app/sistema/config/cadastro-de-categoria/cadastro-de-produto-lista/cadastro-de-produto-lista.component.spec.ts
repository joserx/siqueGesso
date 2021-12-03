import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeProdutoListaComponent } from './cadastro-de-produto-lista.component';

describe('CadastroDeProdutoListaComponent', () => {
  let component: CadastroDeProdutoListaComponent;
  let fixture: ComponentFixture<CadastroDeProdutoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDeProdutoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDeProdutoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
