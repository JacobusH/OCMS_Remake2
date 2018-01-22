import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-tile-carousel',
  templateUrl: './tile-carousel.component.html',
  styleUrls: ['./tile-carousel.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TileCarouselComponent implements OnInit {
  @Input() isShown?: boolean = true;
  public carouselTileItems: Array<any> = [];
  public carouselTile: NgxCarousel;

  constructor() { }

  ngOnInit() {
    // this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    // this.carouselTileItems = [
    //   '../../../assets/img/gallery/GalleryPhoto (1).jpg'
    //   , 1
    //   , 2
    //   , 3
    //   , 4
    //   , 5
    //   , 6
    //   , 7
    //   , 8
    //   , 9
    //   , 10
    //   , 11
    //   , 12
    //   , 13
    // ];

    var inThere: Array<number> = [];
    for(var i = 0; i < 10; i++) {
      var numb = this.getRandomInt(1, 171);
      if(!inThere.includes(numb)) {
        this.carouselTileItems.push('../../../assets/img/gallery/GalleryPhoto (' + numb + ').jpg');
      }
    }

 
    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }
  }

  // carouselLoad will trigger this funnction when your load value reaches
  // it is helps to load the data by parts to increase the performance of the app
  // must use feature to all carousel
  public carouselTileLoad(evt: any) {
    // const len = this.carouselTileItems.length
    // if (len <= 30) {
    //   for (let i = len; i < len + 10; i++) {
    //     this.carouselTileItems.push(i);
    //   }
    // }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


}
