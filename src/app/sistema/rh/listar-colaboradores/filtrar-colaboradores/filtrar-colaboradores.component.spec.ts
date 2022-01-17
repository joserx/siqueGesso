import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarColaboradoresComponent } from './filtrar-colaboradores.component';

describe('FiltrarColaboradoresComponent', () => {
  let component: FiltrarColaboradoresComponent;
  let fixture: ComponentFixture<FiltrarColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrarColaboradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
