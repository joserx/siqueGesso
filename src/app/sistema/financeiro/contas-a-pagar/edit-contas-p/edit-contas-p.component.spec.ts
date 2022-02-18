import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContasPComponent } from './edit-contas-p.component';

describe('EditContasPComponent', () => {
  let component: EditContasPComponent;
  let fixture: ComponentFixture<EditContasPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContasPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContasPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
