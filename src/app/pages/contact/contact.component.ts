import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit, ViewEncapsulation, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactMessage } from 'app/models/_index';
import { ContactMessageService } from 'app/services/_index';
import * as firebase from 'firebase/app';

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
  sub: any;
  id: any;

  constructor(private contactService: ContactMessageService
    , private router: Router
    , private route:ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id == 'summercamp') {
        this.model = this.contactService.createNew();
        this.model.message = 'I am interested in coming to Summer Boot Camp!';
      }
      else if(this.id == 'bootcamp') {
        this.model = this.contactService.createNew();
        this.model.message = 'I am interested in joining a Boot Camp!';
      }
   });
  }

  saveContactMessage(form: NgForm) {
    let mm: ContactMessage = this.model;
    
    this.contactService.save(mm);
    this.model = this.contactService.createNew();

    form.reset();
    this.router.navigate(['thanks'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
}
