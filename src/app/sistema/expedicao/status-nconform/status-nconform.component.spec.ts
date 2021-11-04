import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusNconformComponent } from './status-nconform.component';

describe('StatusNconformComponent', () => {
  let component: StatusNconformComponent;
  let fixture: ComponentFixture<StatusNconformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusNconformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusNconformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
