import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleVtComponent } from './controle-vt.component';

describe('ControleVtComponent', () => {
  let component: ControleVtComponent;
  let fixture: ComponentFixture<ControleVtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleVtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleVtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
