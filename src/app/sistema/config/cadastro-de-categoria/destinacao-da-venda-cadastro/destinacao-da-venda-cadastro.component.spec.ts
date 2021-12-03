import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinacaoDaVendaCadastroComponent } from './destinacao-da-venda-cadastro.component';

describe('DestinacaoDaVendaCadastroComponent', () => {
  let component: DestinacaoDaVendaCadastroComponent;
  let fixture: ComponentFixture<DestinacaoDaVendaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinacaoDaVendaCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinacaoDaVendaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
