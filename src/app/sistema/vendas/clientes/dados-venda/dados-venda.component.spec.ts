import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosVendaComponent } from './dados-venda.component';

describe('DadosVendaComponent', () => {
  let component: DadosVendaComponent;
  let fixture: ComponentFixture<DadosVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosVendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
