import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit, ViewEncapsulation, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactMessage } from 'app/models/_index';
import { ContactMessageService } from 'app/services/_index';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap'
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactComponent implements OnInit {
  model = this.contactService.createNew();

  constructor(private contactService: ContactMessageService, private router: Router, private route:ActivatedRoute) { 
    
  }

  ngOnInit() {
  }

  saveContactMessage(form: NgForm) {
    let mm: ContactMessage = this.model;
    
    this.contactService.save(mm);
    this.model = this.contactService.createNew();

    form.reset();
    this.router.navigate(['thanks'], {relativeTo: this.route});
  }


}
