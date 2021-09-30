import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVtComponent } from './relatorio-vt.component';

describe('RelatorioVtComponent', () => {
  let component: RelatorioVtComponent;
  let fixture: ComponentFixture<RelatorioVtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioVtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
