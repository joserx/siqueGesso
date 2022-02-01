import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroDestinacaoComponent } from './filtro-destinacao.component';

describe('FiltroDestinacaoComponent', () => {
  let component: FiltroDestinacaoComponent;
  let fixture: ComponentFixture<FiltroDestinacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroDestinacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroDestinacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
