import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnnouncementService } from 'app/services/announcement.service';
import { Announcement } from 'app/models/announcement.model';
import { MatDialog } from '@angular/material';
import { AnnouncementsComponent } from 'app/components/announcements/announcements.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-video',
  templateUrl: './home-video.component.html',
  styleUrls: ['./home-video.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeVideoComponent implements OnInit {
  player: YT.Player;
  ids: Array<string> = ['WxVIYxE9CEI', 'DIIbPp6j12I'];

  constructor() { }

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
