import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Announcement } from 'app/models/_index';
import { AnnouncementService } from 'app/services/_index';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-admin-form-announcements',
  templateUrl: './admin-announcements.component.html',
  styleUrls: ['./admin-announcements.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminFormAnnouncementsComponent implements OnInit {
  model = this.announcementService.createNew();
  selectedAnnouncement: Announcement;
  announcements: Observable<{}[]>;
  view: any;

  constructor(private announcementService: AnnouncementService) { 
    this.announcements = this.announcementService.announcements.valueChanges();
  }

  ngOnInit() {
  }

  saveAnnouncement(form: NgForm) {
    // uploading new teacher with picture
    if(this.selectedAnnouncement == null) {
      this.announcementService.save(this.model)
      this.model = this.announcementService.createNew();
      form.reset();
    }
    // editing testimonial
    else {
      this.announcementService.edit(this.selectedAnnouncement)
      form.reset();
    }
  }

  setNewAnnouncement() {
    this.selectedAnnouncement = null;
    this.model = this.announcementService.createNew();
  }

  setSelectedAnnouncement(announcement: Announcement) {
    this.selectedAnnouncement = announcement;
    this.model = announcement;
  }

  deleteAnnouncement(form: NgForm) {
    form.reset();
    this.announcementService.delete(this.selectedAnnouncement);
  }
}
