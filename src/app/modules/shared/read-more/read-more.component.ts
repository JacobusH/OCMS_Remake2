import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ReadMoreComponent implements OnInit {
  @Input() text: string;
  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
