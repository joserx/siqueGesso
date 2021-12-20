import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCadastroLojaComponent } from './listar-cadastro-loja.component';

describe('ListarCadastroLojaComponent', () => {
  let component: ListarCadastroLojaComponent;
  let fixture: ComponentFixture<ListarCadastroLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCadastroLojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCadastroLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
