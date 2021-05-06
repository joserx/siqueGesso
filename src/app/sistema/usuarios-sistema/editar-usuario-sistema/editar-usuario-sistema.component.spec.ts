import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuarioSistemaComponent } from './editar-usuario-sistema.component';

describe('EditarUsuarioSistemaComponent', () => {
  let component: EditarUsuarioSistemaComponent;
  let fixture: ComponentFixture<EditarUsuarioSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarUsuarioSistemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUsuarioSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
