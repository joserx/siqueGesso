import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCategoriaComponent } from './visualizar-categoria.component';

describe('VisualizarCategoriaComponent', () => {
  let component: VisualizarCategoriaComponent;
  let fixture: ComponentFixture<VisualizarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
