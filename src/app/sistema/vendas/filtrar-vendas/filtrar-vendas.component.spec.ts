import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarVendasComponent } from './filtrar-vendas.component';

describe('FiltrarVendasComponent', () => {
  let component: FiltrarVendasComponent;
  let fixture: ComponentFixture<FiltrarVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrarVendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
