import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhMenuComponent } from './rh-menu.component';

describe('RhMenuComponent', () => {
  let component: RhMenuComponent;
  let fixture: ComponentFixture<RhMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RhMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RhMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
