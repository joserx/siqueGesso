import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProdutoEstoqueComponent } from './edit-produto-estoque.component';

describe('EditProdutoEstoqueComponent', () => {
  let component: EditProdutoEstoqueComponent;
  let fixture: ComponentFixture<EditProdutoEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProdutoEstoqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProdutoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
