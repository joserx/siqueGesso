import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoCreditoComponent } from './avaliacao-credito.component';

describe('AvaliacaoCreditoComponent', () => {
  let component: AvaliacaoCreditoComponent;
  let fixture: ComponentFixture<AvaliacaoCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
