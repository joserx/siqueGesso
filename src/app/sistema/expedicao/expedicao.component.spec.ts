import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedicaoComponent } from './expedicao.component';

describe('ExpedicaoComponent', () => {
  let component: ExpedicaoComponent;
  let fixture: ComponentFixture<ExpedicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
