import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUsuariosSistemaComponent } from './listar-usuarios-sistema.component';

describe('ListarUsuariosSistemaComponent', () => {
  let component: ListarUsuariosSistemaComponent;
  let fixture: ComponentFixture<ListarUsuariosSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarUsuariosSistemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUsuariosSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
