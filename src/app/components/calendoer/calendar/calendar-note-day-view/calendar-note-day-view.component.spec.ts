import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNoteDayViewComponent } from './calendar-note-day-view.component';

describe('CalendarNoteDayViewComponent', () => {
  let component: CalendarNoteDayViewComponent;
  let fixture: ComponentFixture<CalendarNoteDayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarNoteDayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarNoteDayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
