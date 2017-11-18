import { Component, ChangeDetectionStrategy, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { addDays, differenceInDays, startOfDay } from 'date-fns';
import { Subject } from 'rxjs/Subject';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendoer',
  templateUrl: './calendoer.component.html',
  styleUrls: ['./calendoer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendoerComponent implements OnInit {
  activeDayIsOpen: boolean = false;
  clickedDate: Date;
  view: string = 'month';
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  
  extEvents: CalendarEvent[] = [
    {
      title: 'From Outside 1',
      color: colors.red,
      start: new Date(),
      cssClass: 'ext-calendar-event',
      draggable: true
    },
    {
      title: 'From Outside 2',
      color: colors.red,
      start: new Date(),
      cssClass: 'ext-calendar-event',
      draggable: true
    }
  ];
  events: CalendarEvent[] = [
    {
      title: 'Click n Drag Me',
      color: colors.red,
      start: new Date(),
      cssClass: 'calendar-event',
      draggable: true
    },
    {
      title: 'Or click me',
      color: colors.blue,
      start: new Date(),
      cssClass: 'calendar-event'
    }
  ];

  constructor() {

  }

  ngOnInit() {

  }

  /***************
  ** EVENTS
  ***************/
  addEvent(date: Date): void {
    this.events.push({
      start: date,
      title: 'New event',
      color: colors.red
    });
    this.refresh.next();
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  // catches time changes including drop events
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    const externalIndex: number = this.extEvents.indexOf(event);
    if (externalIndex > -1) {
      this.extEvents.splice(externalIndex, 1);
      this.events.push(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    this.viewDate = newStart;
    this.activeDayIsOpen = true;
    // event.start = newStart;
    // event.end = newEnd;
    // this.refresh.next();
  }

  /***************
  ** MONTH
  ***************/
  monthDayClicked(event) {
    this.clickedDate = event.day.date; 
    this.viewDate = event.day.date; 
    this.view = 'day'
  }

  /***************
  ** WEEK
  ***************/
  dayHeaderClicked(event) {
    this.clickedDate = event.day.date;
    this.viewDate = event.day.date; 
    this.view = 'day'
  }

  /*************** 
  ** DAY
  ***************/

}