import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarOrdemExpedicaoComponent } from './criar-ordem-expedicao.component';

describe('CriarOrdemExpedicaoComponent', () => {
  let component: CriarOrdemExpedicaoComponent;
  let fixture: ComponentFixture<CriarOrdemExpedicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarOrdemExpedicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarOrdemExpedicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
