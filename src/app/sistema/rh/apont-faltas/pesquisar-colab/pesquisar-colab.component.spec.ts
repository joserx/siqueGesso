import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarColabComponent } from './pesquisar-colab.component';

describe('PesquisarColabComponent', () => {
  let component: PesquisarColabComponent;
  let fixture: ComponentFixture<PesquisarColabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisarColabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarColabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
