import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCondicaoComponent } from './cadastro-condicao.component';

describe('CadastroCondicaoComponent', () => {
  let component: CadastroCondicaoComponent;
  let fixture: ComponentFixture<CadastroCondicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroCondicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCondicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
