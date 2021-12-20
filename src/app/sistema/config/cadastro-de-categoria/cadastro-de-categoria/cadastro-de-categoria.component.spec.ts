import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeCategoriaComponent } from './cadastro-de-categoria.component';

describe('CadastroDeCategoriaComponent', () => {
  let component: CadastroDeCategoriaComponent;
  let fixture: ComponentFixture<CadastroDeCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDeCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDeCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
