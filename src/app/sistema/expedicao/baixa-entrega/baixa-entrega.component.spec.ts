import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaixaEntregaComponent } from './baixa-entrega.component';

describe('BaixaEntregaComponent', () => {
  let component: BaixaEntregaComponent;
  let fixture: ComponentFixture<BaixaEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaixaEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaixaEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
