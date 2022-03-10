import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPermissoesComponent } from './criar-permissoes.component';

describe('CriarPermissoesComponent', () => {
  let component: CriarPermissoesComponent;
  let fixture: ComponentFixture<CriarPermissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarPermissoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarPermissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
