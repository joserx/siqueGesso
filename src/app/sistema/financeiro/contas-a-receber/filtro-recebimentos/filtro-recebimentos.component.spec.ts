import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroRecebimentosComponent } from './filtro-recebimentos.component';

describe('FiltroRecebimentosComponent', () => {
  let component: FiltroRecebimentosComponent;
  let fixture: ComponentFixture<FiltroRecebimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroRecebimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroRecebimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
