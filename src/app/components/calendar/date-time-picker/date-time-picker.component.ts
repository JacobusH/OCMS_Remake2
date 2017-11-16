import { ChangeDetectorRef, Component, forwardRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  getSeconds,
  getMinutes,
  getHours,
  getDate,
  getMonth,
  getYear,
  setSeconds,
  setMinutes,
  setHours,
  setDate,
  setMonth,
  setYear
} from 'date-fns';
import { NgbDateStruct, NgbTimeStruct, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimePickerComponent),
  multi: true
};

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateTimePickerComponent implements OnInit {
  @Input() placeholder: string;
  date: Date;
  dateStruct: NgbDateStruct;
  timeStruct: NgbTimeStruct;
  datePicker: any;
  private onChangeCallback: (date: Date) => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    
  }
  
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {

  }

  writeValue(date: Date): void {
    this.date = date;
    this.dateStruct = {
      day: getDate(date),
      month: getMonth(date) + 1,
      year: getYear(date)
    };
    this.timeStruct = {
      second: getSeconds(date),
      minute: getMinutes(date),
      hour: getHours(date)
    };
    this.cdr.detectChanges();
  }

  updateDate(): void {
    const newDate: Date = setYear(
      setMonth(
        setDate(this.date, this.dateStruct.day),
        this.dateStruct.month - 1
      ),
      this.dateStruct.year
    );
    this.onChangeCallback(newDate);
  }

  updateTime(): void {
    const newDate: Date = setHours(
      setMinutes(
        setSeconds(this.date, this.timeStruct.second),
        this.timeStruct.minute
      ),
      this.timeStruct.hour
    );
    this.onChangeCallback(newDate);
  }

}
