import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApontFaltasComponent } from './apont-faltas.component';

describe('ApontFaltasComponent', () => {
  let component: ApontFaltasComponent;
  let fixture: ComponentFixture<ApontFaltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApontFaltasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApontFaltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
