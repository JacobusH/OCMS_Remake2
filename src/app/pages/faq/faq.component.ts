import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit, ViewEncapsulation, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FAQ } from 'app/models/_index';
import { FAQService } from 'app/services/_index';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FaqComponent implements OnInit {
  // testimonials: AngularFirestoreCollection<Testimonial>;
  faqs: Observable<FAQ[]>;
  
  constructor(private afs: AngularFirestore, private testServ: FAQService) { 
    this.faqs = this.testServ.faqs.valueChanges();
  }

  ngOnInit() {
  }

}
