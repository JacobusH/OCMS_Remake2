import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VideoItem, Upload } from 'app/models/_index';
import { VideoItemService } from 'app/services/_index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class VideosComponent implements OnInit {
  videosActive: Observable<VideoItem[]>;

  constructor(private videoService: VideoItemService) { 
    this.videosActive = this.videoService.videoItemsActive.valueChanges();
  }

  ngOnInit() {
  }

}
