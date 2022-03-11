import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPagarComponent } from './filtro-pagar.component';

describe('FiltroPagarComponent', () => {
  let component: FiltroPagarComponent;
  let fixture: ComponentFixture<FiltroPagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroPagarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
