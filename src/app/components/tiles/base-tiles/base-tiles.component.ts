import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-base-tiles',
  templateUrl: './base-tiles.component.html',
  styleUrls: ['./base-tiles.component.scss']
})
export class BaseTilesComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
