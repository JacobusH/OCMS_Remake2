import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent implements OnInit {
  @Input() bubbleClass: string; // left | right
  @Input() time: string;
  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

  getBubbleClass() {
    return this.bubbleClass == 'left' ? 'bubble-left' : 'bubble-right';
  }

}
