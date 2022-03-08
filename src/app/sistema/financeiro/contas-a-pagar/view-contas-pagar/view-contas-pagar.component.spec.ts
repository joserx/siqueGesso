import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContasPagarComponent } from './view-contas-pagar.component';

describe('ViewContasPagarComponent', () => {
  let component: ViewContasPagarComponent;
  let fixture: ComponentFixture<ViewContasPagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewContasPagarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContasPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
