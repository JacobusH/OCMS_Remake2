import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { addDays, differenceInDays, startOfDay } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
// import { colors } from '../demo-utils/colors';

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
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
   
  }

}

