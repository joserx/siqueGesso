import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioProdutosViewComponent } from './relatorio-produtos-view.component';

describe('RelatorioProdutosViewComponent', () => {
  let component: RelatorioProdutosViewComponent;
  let fixture: ComponentFixture<RelatorioProdutosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioProdutosViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioProdutosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
