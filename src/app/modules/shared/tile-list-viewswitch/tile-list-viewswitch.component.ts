import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tile-list-viewswitch',
  templateUrl: './tile-list-viewswitch.component.html',
  styleUrls: ['./tile-list-viewswitch.component.scss']
})
export class TileListViewswitchComponent implements OnInit {
  @Output() viewSelected: EventEmitter<string> = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  myViewSelected(sel: string) {
    this.viewSelected.next(sel);
  }

}
