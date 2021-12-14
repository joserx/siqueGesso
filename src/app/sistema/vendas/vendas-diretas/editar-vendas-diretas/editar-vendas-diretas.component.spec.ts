import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVendasDiretasComponent } from './editar-vendas-diretas.component';

describe('EditarVendasDiretasComponent', () => {
  let component: EditarVendasDiretasComponent;
  let fixture: ComponentFixture<EditarVendasDiretasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarVendasDiretasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVendasDiretasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
