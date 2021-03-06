import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { addDays, differenceInDays, startOfDay } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
// import { SumService } from '../../../../node_modules/todo-module/dist';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  testNumber1:number = 1;
  testNumber2:number = 11;
  dispNumber:number;

  // constructor(private route: ActivatedRoute, private sumService:SumService) { }
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.sumService.calculate(this.testNumber1, this.testNumber2);
    // this.dispNumber = this.sumService.sum;
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