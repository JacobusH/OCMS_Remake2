import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Signup, Upload } from 'app/models/_index';
import { SignupService, UploadService } from 'app/services/_index';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm
} from '@angular/forms';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-sign-ups',
  templateUrl: './sign-ups.component.html',
  styleUrls: ['./sign-ups.component.scss']
})
export class AdminSignUpsComponent implements OnInit {
  @Input() filterBy?: string = 'all';
  @Input() readFilterBy?: string = 'all';
  signups: Observable<{}[]>;
  instruments = [
    {value: 'all', viewValue: 'All'},  
    {value: 'Bass', viewValue: 'Bass'},  
    {value: 'Cello', viewValue: 'Cello'},  
    {value: 'Clarinet', viewValue: 'Clarinet'},  
    {value: 'Drums', viewValue: 'Drums'},  
    {value: 'Flute', viewValue: 'Flute'},  
    {value: 'Guitar', viewValue: 'Guitar'},  
    {value: 'Piano', viewValue: 'Piano'},
    {value: 'Sax', viewValue: 'Saxophone'},  
    {value: 'Singing', viewValue: 'Singing'},
    {value: 'Trumpet', viewValue: 'Trumpet'},  
    {value: 'Ukulele', viewValue: 'Ukulele'},
    {value: 'Violin', viewValue: 'Violin'}
  ];
  readFilter = [
    {value: 'all', viewValue: 'All'},  
    {value: 'Read', viewValue: 'Read'},  
    {value: 'Unread', viewValue: 'Unread'}
  ];

  constructor(private signupService: SignupService, private afs: AngularFirestore) { 
    this.signups = this.signupService.signupsRecentFirst.valueChanges();
  }

  ngOnInit() {
  }

  readClicked(event, msg: Signup) {
    msg.read = !msg.read;
    this.signupService.edit(msg);
  }

  instrumentFilterClicked(sel: string) {
    this.filterBy = sel; 
  }

  readFilterClicked(sel: string) {
    this.readFilterBy = sel; 
  }

  selectedDate(event) {
    this.signups = this.afs.collection('signups', 
      ref => ref.where('createdAt', '>=', new Date(event.start))
        .where('createdAt', '<=', new Date(event.end))).valueChanges();

  }

}
