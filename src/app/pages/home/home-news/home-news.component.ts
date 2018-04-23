import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnnouncementService } from 'app/services/announcement.service';
import { Announcement } from 'app/models/announcement.model';
import { MatDialog } from '@angular/material';
import { AnnouncementsComponent } from 'app/components/announcements/announcements.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeNewsComponent implements OnInit {
  announcements: Observable<{}[]>;

  constructor(private announcementService: AnnouncementService
    , public dialog: MatDialog) { }

  ngOnInit() {
    this.announcements = this.announcementService.announcementsMostRecent1.valueChanges();
  }

  showAnnouncements() {
    const dialogRef = this.dialog.open(AnnouncementsComponent, {
      height: '80%'
    }).afterClosed().subscribe(result => {
      // localStorage.setItem("OCMSNoAdvert", new Date().setDate(new Date().getDate() + 1) + ''); // one day expiration
    });
  }

}
