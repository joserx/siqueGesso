import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerquisarVendaComponent } from './perquisar-venda.component';

describe('PerquisarVendaComponent', () => {
  let component: PerquisarVendaComponent;
  let fixture: ComponentFixture<PerquisarVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerquisarVendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerquisarVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
