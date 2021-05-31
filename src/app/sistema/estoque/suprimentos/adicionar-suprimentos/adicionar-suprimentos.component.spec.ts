import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarSuprimentosComponent } from './adicionar-suprimentos.component';

describe('AdicionarSuprimentosComponent', () => {
  let component: AdicionarSuprimentosComponent;
  let fixture: ComponentFixture<AdicionarSuprimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarSuprimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarSuprimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
