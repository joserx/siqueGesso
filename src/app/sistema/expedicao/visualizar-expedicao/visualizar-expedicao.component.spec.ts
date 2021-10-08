import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarExpedicaoComponent } from './visualizar-expedicao.component';

describe('VisualizarExpedicaoComponent', () => {
  let component: VisualizarExpedicaoComponent;
  let fixture: ComponentFixture<VisualizarExpedicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarExpedicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarExpedicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
