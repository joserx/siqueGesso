import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarFornecedoresComponent } from './adicionar-fornecedores.component';

describe('AdicionarFornecedoresComponent', () => {
  let component: AdicionarFornecedoresComponent;
  let fixture: ComponentFixture<AdicionarFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarFornecedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
