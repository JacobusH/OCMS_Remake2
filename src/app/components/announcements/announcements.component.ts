import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnnouncementService } from 'app/services/announcement.service';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AnnouncementsComponent implements OnInit {
  announcements: Observable<{}[]>;
  announcementsLastDay: Observable<{}[]>;
  announcementsActive: Observable<{}[]>;
  isVisible:boolean = false;
  doPulse: boolean = false;


  constructor(private announcementService: AnnouncementService) { 
    this.announcements = this.announcementService.announcements.valueChanges();
    this.announcementsLastDay = this.announcementService.announcementsLastDay.valueChanges();
    this.announcementsActive = this.announcementService.announcementsActive.valueChanges();
  }

  ngOnInit() {
    this.announcementsLastDay.subscribe((ann) =>{
      if(ann.length > 0) {
        this.doPulse = true;
      }
    })
  }


}
