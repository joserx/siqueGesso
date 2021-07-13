import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarUsuarioSistemaComponent } from './criar-usuario-sistema.component';

describe('CriarUsuarioSistemaComponent', () => {
  let component: CriarUsuarioSistemaComponent;
  let fixture: ComponentFixture<CriarUsuarioSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarUsuarioSistemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarUsuarioSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
