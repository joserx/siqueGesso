import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPermissoesComponent } from './editar-permissoes.component';

describe('EditarPermissoesComponent', () => {
  let component: EditarPermissoesComponent;
  let fixture: ComponentFixture<EditarPermissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPermissoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPermissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
