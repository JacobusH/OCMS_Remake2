import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selector-single',
  templateUrl: './selector-single.component.html',
  styleUrls: ['./selector-single.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SelectorSingleComponent implements OnInit {
  @Input() placeHolder: string;
  @Input() displayValues: Array<{'value': string, 'viewValue': string}>;
  @Output() valueSelected: EventEmitter<string> = new EventEmitter;
  selectedValue: any;

  constructor() { }

  ngOnInit() {
  }

  myValueSelected(sel: string) {
    this.valueSelected.next(sel);
  }

}
