import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaMsgComponent } from './nova-msg.component';

describe('NovaMsgComponent', () => {
  let component: NovaMsgComponent;
  let fixture: ComponentFixture<NovaMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
