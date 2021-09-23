import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFornecedorComponent } from './view-fornecedor.component';

describe('ViewFornecedorComponent', () => {
  let component: ViewFornecedorComponent;
  let fixture: ComponentFixture<ViewFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFornecedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
