import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class VideoItemComponent implements OnInit {
  @Input('videoId') videoId:string; 
  @Input('title') title:string;
  @Input('caption') caption:string;
  @Input('smallTiles') smallTiles:boolean;
  player: YT.Player;

  constructor() { 
  }

  ngOnInit() {
    
  }

  savePlayer (player) {
    this.player = player;
    console.log('player instance', player)
  }
  
  onStateChange(event){
    console.log('player state', event.data);
  }


}
