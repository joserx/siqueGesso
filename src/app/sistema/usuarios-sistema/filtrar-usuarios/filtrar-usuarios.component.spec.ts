import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarUsuariosComponent } from './filtrar-usuarios.component';

describe('FiltrarUsuariosComponent', () => {
  let component: FiltrarUsuariosComponent;
  let fixture: ComponentFixture<FiltrarUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrarUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
