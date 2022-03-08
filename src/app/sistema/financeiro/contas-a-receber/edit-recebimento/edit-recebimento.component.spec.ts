import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecebimentoComponent } from './edit-recebimento.component';

describe('EditRecebimentoComponent', () => {
  let component: EditRecebimentoComponent;
  let fixture: ComponentFixture<EditRecebimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecebimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecebimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
