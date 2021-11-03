import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedicaoHomeComponent } from './expedicao-home.component';

describe('ExpedicaoHomeComponent', () => {
  let component: ExpedicaoHomeComponent;
  let fixture: ComponentFixture<ExpedicaoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedicaoHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedicaoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
