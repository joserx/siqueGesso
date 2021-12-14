import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarColaboradorComponent } from './pesquisar-colaborador.component';

describe('PesquisarColaboradorComponent', () => {
  let component: PesquisarColaboradorComponent;
  let fixture: ComponentFixture<PesquisarColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisarColaboradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
