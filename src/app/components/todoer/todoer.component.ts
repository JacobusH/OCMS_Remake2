import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-todoer',
  templateUrl: './todoer.component.html',
  styleUrls: ['./todoer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
