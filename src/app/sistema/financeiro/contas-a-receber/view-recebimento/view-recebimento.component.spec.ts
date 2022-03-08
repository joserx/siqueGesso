import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecebimentoComponent } from './view-recebimento.component';

describe('ViewRecebimentoComponent', () => {
  let component: ViewRecebimentoComponent;
  let fixture: ComponentFixture<ViewRecebimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecebimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecebimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
