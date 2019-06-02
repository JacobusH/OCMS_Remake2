import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { JoinUs, Upload } from 'app/models/_index';
import { JoinUsService, UploadService } from 'app/services/_index';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-join-us',
  templateUrl: './admin-join-us.component.html',
  styleUrls: ['./admin-join-us.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminJoinUsComponent implements OnInit {
  firebaseUrl: string = 'gs://ocmusicschool-11817.appspot.com/';
  items: Observable<JoinUs[]>;

  constructor(private joinService: JoinUsService) { 
    this.items = this.joinService.joins.valueChanges();
  }

  ngOnInit() {
  }



}
