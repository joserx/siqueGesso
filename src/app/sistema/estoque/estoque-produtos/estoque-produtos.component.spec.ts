import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueProdutosComponent } from './estoque-produtos.component';

describe('EstoqueProdutosComponent', () => {
  let component: EstoqueProdutosComponent;
  let fixture: ComponentFixture<EstoqueProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstoqueProdutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
