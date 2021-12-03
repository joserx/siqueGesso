import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeProdutoComponent } from './cadastro-de-produto.component';

describe('CadastroDeProdutoComponent', () => {
  let component: CadastroDeProdutoComponent;
  let fixture: ComponentFixture<CadastroDeProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDeProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDeProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
