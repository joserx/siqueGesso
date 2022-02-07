import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEstoqueProdutoComponent } from './view-estoque-produto.component';

describe('ViewEstoqueProdutoComponent', () => {
  let component: ViewEstoqueProdutoComponent;
  let fixture: ComponentFixture<ViewEstoqueProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEstoqueProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEstoqueProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
