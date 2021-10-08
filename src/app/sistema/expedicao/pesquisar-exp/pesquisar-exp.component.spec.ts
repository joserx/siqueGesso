import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarExpComponent } from './pesquisar-exp.component';

describe('PesquisarExpComponent', () => {
  let component: PesquisarExpComponent;
  let fixture: ComponentFixture<PesquisarExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisarExpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
