import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarExpedicaoComponent } from './editar-expedicao.component';

describe('EditarExpedicaoComponent', () => {
  let component: EditarExpedicaoComponent;
  let fixture: ComponentFixture<EditarExpedicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarExpedicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarExpedicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
