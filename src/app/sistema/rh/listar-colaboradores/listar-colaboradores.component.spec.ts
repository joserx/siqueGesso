import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarColaboradoresComponent } from './listar-colaboradores.component';

describe('ListarColaboradoresComponent', () => {
  let component: ListarColaboradoresComponent;
  let fixture: ComponentFixture<ListarColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarColaboradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
