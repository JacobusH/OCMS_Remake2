import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tile-display',
  templateUrl: './tile-display.component.html',
  styleUrls: ['./tile-display.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TileDisplayComponent implements OnInit {
  items: any;
  
  constructor() { }

  ngOnInit() {
  }

}
