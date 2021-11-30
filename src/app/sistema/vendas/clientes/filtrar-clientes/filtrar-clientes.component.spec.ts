import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarClientesComponent } from './filtrar-clientes.component';

describe('FiltrarClientesComponent', () => {
  let component: FiltrarClientesComponent;
  let fixture: ComponentFixture<FiltrarClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrarClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
