import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarProdutosModalComponent } from './selecionar-produtos-modal.component';

describe('SelecionarProdutosModalComponent', () => {
  let component: SelecionarProdutosModalComponent;
  let fixture: ComponentFixture<SelecionarProdutosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionarProdutosModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarProdutosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
