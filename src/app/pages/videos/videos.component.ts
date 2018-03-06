import { Component, OnInit, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import { VideoItem, Upload } from 'app/models/_index';
import { VideoItemService } from 'app/services/_index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class VideosComponent implements OnInit, OnChanges {
  @Input() filterBy?: string = 'all';
  videosActive: Observable<VideoItem[]>;
  filterOptions: Array<string> = [];

  currentPage: number = 0;
  totalPages: number = 1;
  pageSize: number = 10;

  constructor(private videoService: VideoItemService) { 
    // this.videosActive = this.videoService.videoItemsActive.valueChanges();
  }

  ngOnInit() {
    this.videosActive = this.videoService.videoItemsActive.valueChanges();
    // this.videosActive = this.videoService.getRange(0, 10).valueChanges();

    this.videosActive.subscribe(x => {

      for(var i = 0; i < x.length; i++) {
        let splits = x[i].categories.split(',');
        for(var j = 0; j < splits.length; j++) {
          var element = splits[j].replace(/\s/g, '');
          if(this.filterOptions.indexOf(element) === -1) {
            this.filterOptions.push(element);
          }
        }
      }

    })
  }

  ngOnChanges() {

  }

  filterClicked(filterApplied: string) {
    this.filterBy = filterApplied; 
 }


}
