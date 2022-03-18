import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMsgComponent } from './view-msg.component';

describe('ViewMsgComponent', () => {
  let component: ViewMsgComponent;
  let fixture: ComponentFixture<ViewMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
