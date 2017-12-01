import { Component, OnChanges, EventEmitter, ChangeDetectorRef, Input, OnInit, OnDestroy, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
// import { CalendarDayViewComponent } from '../../../../../node_modules/angular-calendar/dist/esm/src/components/day/calendarDayView.component';
// import { CalendarUtils } from './../../../../../node_modules/angular-calendar/dist/esm/src/providers/calendarUtils.provider';

@Component({
  selector: 'app-calendar-note-day-view',
  templateUrl: './calendar-note-day-view.component.html',
  styleUrls: ['./calendar-note-day-view.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CalendarNoteDayViewComponent implements OnInit {
  @Input('viewDate') viewDate: Date;
  @Input('events') events: CalendarEvent[];

  constructor() { 
    
  }

  ngOnInit() {
  }

}
