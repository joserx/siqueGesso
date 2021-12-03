import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinacaoDaVendaListaComponent } from './destinacao-da-venda-lista.component';

describe('DestinacaoDaVendaListaComponent', () => {
  let component: DestinacaoDaVendaListaComponent;
  let fixture: ComponentFixture<DestinacaoDaVendaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinacaoDaVendaListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinacaoDaVendaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
