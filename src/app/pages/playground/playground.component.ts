import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { addDays, differenceInDays, startOfDay } from 'date-fns';
// import { colors } from '../demo-utils/colors';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  dropOverActive: boolean = false;
  droppedData: string = '';

  view: string = 'month';
  viewDate: Date = new Date();
  externalEvents: CalendarEvent[] = [
    {
      title: 'Event 1',
      color: colors.yellow,
      start: new Date(),
      draggable: true
    },
    {
      title: 'Event 2',
      color: colors.blue,
      start: new Date(),
      draggable: true
    }
  ];

  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  refresh: Subject<any> = new Subject();

  constructor() { }

  ngOnInit() {
  }

  eventDropped({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    const externalIndex: number = this.externalEvents.indexOf(event);
    if (externalIndex > -1) {
      this.externalEvents.splice(externalIndex, 1);
      this.events.push(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    this.viewDate = newStart;
    this.activeDayIsOpen = true;
  }

  dragEnd(event) {
    console.log('Element was dragged', event);
  }

  onDrop({ dropData }: { dropData: any }): void {
    this.dropOverActive = false;
    this.droppedData = dropData;
    setTimeout(() => {
      this.droppedData = '';
    }, 2000);
  }

}

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