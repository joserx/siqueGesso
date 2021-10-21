import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEmbarqueComponent } from './criar-embarque.component';

describe('CriarEmbarqueComponent', () => {
  let component: CriarEmbarqueComponent;
  let fixture: ComponentFixture<CriarEmbarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarEmbarqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarEmbarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
