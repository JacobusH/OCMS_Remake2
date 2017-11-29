import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Signup, Upload } from 'app/models/_index';
import { Daterangepicker, DaterangepickerConfig } from 'ng2-daterangepicker';
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
import { AdminTeachersComponent } from 'app/pages/administration/teachers/teachers.component';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-sign-ups',
  templateUrl: './sign-ups.component.html',
  styleUrls: ['./sign-ups.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminSignUpsComponent implements OnInit {
  @Input() filterBy?: string = 'all';
  @Input() readFilterBy?: string = 'all';
  public daterange: any = {};
  public dateInputs: any = [
    {
        start: moment().subtract(6, 'month'),
        end: moment()
    }
  ];
  public mainInput = {
      start: moment().subtract(12, 'month'),
      end: moment().subtract(6, 'month')
  }
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };
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
  instSelectedValue;
  readSelectedValue;

  signups: Observable<Signup[]>;

  constructor(private signupService: SignupService, private daterangepickerOptions: DaterangepickerConfig) { 
    this.signups = this.signupService.signups.valueChanges();

    this.daterangepickerOptions.settings = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false,
      ranges: {
        'Last Month': [moment().subtract(1, 'month'), moment().add(1, 'day')],
        'Last 3 Months': [moment().subtract(4, 'month'), moment().add(1, 'day')],
        'Last 6 Months': [moment().subtract(6, 'month'), moment().add(1, 'day')],
        'Last 12 Months': [moment().subtract(12, 'month'), moment().add(1, 'day')],
      }
    };
  }

  ngOnInit() {
  }

  readClicked(event, msg: Signup) {
    msg.read = !msg.read;
    this.signupService.edit(msg);
    // this.af.updateSignup(msg);
  }

  filterClicked(filterApplied: string) {
    this.filterBy = filterApplied; 
  }

  readFilterClicked(filterApplied: string) {
    this.readFilterBy = filterApplied; 
  }

  private selectedDate(value: any, dateInput: any) {
    dateInput.start = value.start;
    dateInput.end = value.end;

    // this.signups = this.af.getSignupsByDateRange(value.start, value.end);
  }

}
