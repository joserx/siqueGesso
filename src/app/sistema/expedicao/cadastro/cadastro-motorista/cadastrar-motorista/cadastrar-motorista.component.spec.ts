import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarMotoristaComponent } from './cadastrar-motorista.component';

describe('CadastrarMotoristaComponent', () => {
  let component: CadastrarMotoristaComponent;
  let fixture: ComponentFixture<CadastrarMotoristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarMotoristaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarMotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
