import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuprimentoComponent } from './edit-suprimento.component';

describe('EditSuprimentoComponent', () => {
  let component: EditSuprimentoComponent;
  let fixture: ComponentFixture<EditSuprimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSuprimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSuprimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
