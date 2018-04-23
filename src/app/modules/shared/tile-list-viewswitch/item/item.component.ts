import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tile-list-viewswitch-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ItemComponent implements OnInit {
  @Output() viewSelected: EventEmitter<string> = new EventEmitter;
  @Input() view: string;
  @Input() title: string;
  @Input() desc: string;
  @Input() leftNote: string;
  @Input() rightNote: string;

  constructor() { }

  ngOnInit() {
  }

  myViewSelected(sel: string) {
    this.viewSelected.next(sel);
    this.view = sel;
  }

}
