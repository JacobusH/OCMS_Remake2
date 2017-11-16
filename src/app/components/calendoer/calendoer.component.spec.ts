import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendoerComponent } from './calendoer.component';

describe('CalendoerComponent', () => {
  let component: CalendoerComponent;
  let fixture: ComponentFixture<CalendoerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendoerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendoerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
