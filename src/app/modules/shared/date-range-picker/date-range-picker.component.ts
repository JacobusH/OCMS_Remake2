import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Daterangepicker, DaterangepickerConfig } from 'ng2-daterangepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {
  @Output() dateRangeSelection: EventEmitter<{'start': Date, 'end': Date}> = new EventEmitter();
  public daterange: any = {};
  public dateInputs: any = [
    {
        start: moment().subtract(6, 'month'),
        end: moment()
    }
  ];
  public mainInput = {
      start: moment().subtract(12, 'month'),
      end: moment().subtract(6, 'month')
  }
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };


  constructor(private daterangepickerOptions: DaterangepickerConfig) { 
    this.daterangepickerOptions.settings = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false,
      ranges: {
        'Last Month': [moment().subtract(1, 'month'), moment().add(1, 'day')],
        'Last 3 Months': [moment().subtract(4, 'month'), moment().add(1, 'day')],
        'Last 6 Months': [moment().subtract(6, 'month'), moment().add(1, 'day')],
        'Last 12 Months': [moment().subtract(12, 'month'), moment().add(1, 'day')],
      }
    };
  }

  ngOnInit() {
  }

  private selectedDate(value: any, dateInput: any) {
    dateInput.start = value.start;
    dateInput.end = value.end;
    
    this.dateRangeSelection.next({'start': new Date(dateInput.start), 'end': new Date(dateInput.end)});
  }

}