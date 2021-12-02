import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSuprimentoComponent } from './view-suprimento.component';

describe('ViewSuprimentoComponent', () => {
  let component: ViewSuprimentoComponent;
  let fixture: ComponentFixture<ViewSuprimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSuprimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSuprimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
