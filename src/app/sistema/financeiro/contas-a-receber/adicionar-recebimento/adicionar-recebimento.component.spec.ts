import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarRecebimentoComponent } from './adicionar-recebimento.component';

describe('AdicionarRecebimentoComponent', () => {
  let component: AdicionarRecebimentoComponent;
  let fixture: ComponentFixture<AdicionarRecebimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarRecebimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarRecebimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
