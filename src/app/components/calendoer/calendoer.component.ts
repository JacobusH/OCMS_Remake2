import { Component, ChangeDetectionStrategy, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { addDays, differenceInDays, startOfDay } from 'date-fns';
import { Project, CalendoerEvent, Calendoer } from 'app/models/_index';
import { ProjectService } from 'app/services/_index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CalendoerEventModalComponent } from 'app/components/modals/calendoer-event-modal/calendoer-event-modal.component'; 
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
  encapsulation: ViewEncapsulation.Emulated,
  entryComponents: [ CalendoerEventModalComponent ]
})
export class CalendoerComponent implements OnInit {
  activeDayIsOpen: boolean = false;
  clickedDate: Date;
  contextMenuDate: Date;
  displayModal: boolean = false;
  view: string = 'month';
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();

  dayViewEvents: CalendoerEvent[];
  
  extEvents: CalendoerEvent[] = [
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
  events: CalendoerEvent[] = [
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
  availableEvents: CalendoerEvent[] = [
    {
      title: 'Event 1',
      color: colors.red,
      start: new Date(),
      cssClass: 'calendar-event',
      draggable: true
    },
    {
      title: 'Event 2',
      color: colors.blue,
      start: new Date(),
      cssClass: 'calendar-event'
    }
  ];



  constructor(private projectService: ProjectService, public dialog: MatDialog) {

  }

  ngOnInit() {

  }

  /***************
  ** EVENTS
  ***************/
  showModal(date: Date): void {
    // this.events.push({
    //   start: date,
    //   title: 'New event',
    //   color: colors.red
    // });

    this.contextMenuDate = date;
    this.displayModal = true;
    this.refresh.next();
  }

  addProject(ev: CalendoerEvent) {
    let evN: CalendoerEvent = {
      title: ev.title,
      color: ev.color,
      start: this.contextMenuDate,
      cssClass: ev.cssClass
    }

    this.displayModal = false;
    this.events.push(evN);
    this.refresh.next();
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
    this.viewDate = event.start;
    this.activeDayIsOpen = true;    
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

  openDialog(calendoerEvent: CalendoerEvent): void {
    let dialogRef = this.dialog.open(CalendoerEventModalComponent, {
      width: '250px',
      data: { name: calendoerEvent.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  /***************
  ** MONTH
  ***************/
  monthDayClicked(event) {
    this.clickedDate = event.day.date; 
    this.viewDate = event.day.date; 
    this.view = 'day'
    this.dayViewEvents = event.day.events;
    this.activeDayIsOpen = true;    
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