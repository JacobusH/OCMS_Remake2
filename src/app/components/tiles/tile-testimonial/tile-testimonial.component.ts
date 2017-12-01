import { Component, OnInit } from '@angular/core';
import { BaseTilesComponent } from '../base-tiles/base-tiles.component';

@Component({
  selector: 'app-tile-testimonial',
  templateUrl: './tile-testimonial.component.html',
  styleUrls: ['./tile-testimonial.component.scss'],
})
export class TileTestimonialComponent extends BaseTilesComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
