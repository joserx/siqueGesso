import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceiteEmEsperaComponent } from './aceite-em-espera.component';

describe('AceiteEmEsperaComponent', () => {
  let component: AceiteEmEsperaComponent;
  let fixture: ComponentFixture<AceiteEmEsperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceiteEmEsperaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceiteEmEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
