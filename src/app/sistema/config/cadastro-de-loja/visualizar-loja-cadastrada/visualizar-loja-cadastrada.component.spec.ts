import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarLojaCadastradaComponent } from './visualizar-loja-cadastrada.component';

describe('VisualizarLojaCadastradaComponent', () => {
  let component: VisualizarLojaCadastradaComponent;
  let fixture: ComponentFixture<VisualizarLojaCadastradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarLojaCadastradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarLojaCadastradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
