import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaoConformComponent } from './nao-conform.component';

describe('NaoConformComponent', () => {
  let component: NaoConformComponent;
  let fixture: ComponentFixture<NaoConformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaoConformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaoConformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
