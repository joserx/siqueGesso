import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCadastroLojaComponent } from './editar-cadastro-loja.component';

describe('EditarCadastroLojaComponent', () => {
  let component: EditarCadastroLojaComponent;
  let fixture: ComponentFixture<EditarCadastroLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCadastroLojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCadastroLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
